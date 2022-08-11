import { Course, CourseXML, fetchCourses, fetchCourseXML } from "./courses.ts";
import { log } from "./deps.ts";
import { fetchSubjects, Subject } from "./subjects.ts";
import { fetchTerms, Term } from "./terms.ts";

export type { Course, CourseXML, Subject, Term };
export { fetchCourses, fetchCourseXML, fetchSubjects, fetchTerms };

export interface Everything {
  terms: Term[];
  subjectsByTerm: Map<Term, Subject[]>;
  coursesByTerm: Map<Term, Course[]>;
  courseXML: Map<Course, CourseXML>;
}

export async function fetchAll(): Promise<Everything> {
  const terms = await fetchTerms();
  log.info("Found terms", { terms });
  const everything = {
    terms,
    subjectsByTerm: new Map(),
    coursesByTerm: new Map(),
    courseXML: new Map(),
  };
  const queued: Promise<void>[] = [];
  function defer(f: () => Promise<void>) {
    queued.push(f());
  }
  for (const term of terms) {
    defer(async () => {
      log.info(`Fetching subjects for ${term.name}`, { term });
      const subjects = await fetchSubjects(term.id);
      everything.subjectsByTerm.set(term, subjects);
      const subjectIds = subjects.map((subject) => subject.id);
      log.info(`Fetching courses for ${term.name}`, {
        term,
        subjects,
        subjectIds,
      });
      const courses = await fetchCourses(term.id, subjectIds);
      everything.coursesByTerm.set(term, courses);
      // for (const course of courses) {
      //   defer(async () => {
      //     log.info(
      //       `Fetching course XML for ${course.subject} ${course.courseNumber} in term ${term.name}`,
      //       { term, course },
      //     );
      //     const xml = await fetchCourseXML(
      //       term.id,
      //       course.subject,
      //       course.courseNumber,
      //     );
      //     everything.courseXML.set(course, xml);
      //   });
      // }
    });
  }
  const active: Promise<void>[] = [];
  const maxActive = 4;
  for (let i = 0; i < maxActive && i < queued.length; i++) {
    active.push(queued.pop()!);
  }
  while (queued.length > 0) {
    active.push(queued.pop()!);
    await Promise.any(active);
  }
  await Promise.all(active);
  return everything;
}

export interface SerializableCourse extends Course {
  xml: CourseXML | null;
}

export interface SerializableTerm extends Term {
  subjects: Subject[];
  courses: Course[];
}

export interface SerializableEverything {
  terms: SerializableTerm[];
}

export function serializableCourse(
  everything: Everything,
  course: Course,
): SerializableCourse {
  return {
    ...course,
    xml: everything.courseXML.get(course) ?? null,
  };
}

export function serializableTerm(
  everything: Everything,
  term: Term,
): SerializableTerm {
  return {
    ...term,
    subjects: everything.subjectsByTerm.get(term) ?? [],
    courses: (everything.coursesByTerm.get(term) ?? []).map((course) =>
      serializableCourse(everything, course)
    ),
  };
}

export function serializableEverything(
  everything: Everything,
): SerializableEverything {
  return {
    terms: everything.terms.map((term) => serializableTerm(everything, term)),
  };
}

export async function fetchAllSerializable(): Promise<SerializableEverything> {
  return serializableEverything(await fetchAll());
}

import { chunk, Document, Element, Node } from "./deps.ts";
import { fetchDocument } from "./fetch.ts";
import { NodeStepper } from "./nodeStepper.ts";

const ENDPOINT = "https://ssb.blinn.edu:9010/PROD/bwckschd.p_get_crse_unsec";
const XML_ENDPOINT = "https://ssb.blinn.edu:9010/PROD/bwckctlg.xml";
const ROW_SELECTOR = ".pagebodydiv > .datadisplaytable > tbody > tr";
const DAY_MAPPING: { [short: string]: keyof Days } = {
  M: "monday",
  T: "tuesday",
  W: "wednesday",
  R: "thursday",
  F: "friday",
};

export type Method =
  | "Traditional"
  | "Live Online"
  | "Flex Online"
  | "Blended"
  | "Blended Zoom";

export interface Course {
  name: string;
  method: Method;
  crn: string;
  subject: string;
  courseNumber: string;
  section: string;

  associatedTerm: string;
  registrationStart: string;
  registrationEnd: string;
  levels: string;

  campus: string;
  scheduleType: string;
  fullMethod: string;
  credits: string;

  catalogEntryLink: string | null;

  scheduledMeetingTimes: ScheduledMeetingTime[];
}

export interface Days {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}

export interface ScheduledMeetingTime {
  type: string;
  time: string;
  startTime: string | null;
  endTime: string | null;
  rawDays: string;
  days: Days;
  where: string;
  dateRange: string;
  startDate: string | null;
  endDate: string | null;
  scheduleType: string;
  instructors: string;
}

function extractScheduledMeetingTime(row: Node): ScheduledMeetingTime {
  const stepper = new NodeStepper(row.childNodes, false);
  const type = stepper.next();

  const time = stepper.step(2);
  const [startTime, endTime] = time.includes(" - ")
    ? time.split(" - ")
    : [null, null];

  const rawDays = stepper.step(2);
  const days = {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  };
  for (const mapping of Object.entries(DAY_MAPPING)) {
    const [short, day] = mapping;
    if (rawDays.includes(short)) days[day] = true;
  }

  const where = stepper.step(2);

  const dateRange = stepper.step(2);
  const [startDate, endDate] = dateRange.includes(" - ")
    ? dateRange.split(" - ")
    : [null, null];

  const scheduleType = stepper.step(2);
  const instructors = stepper.step(2);

  return {
    type,
    time,
    startTime,
    endTime,
    rawDays,
    days,
    where,
    dateRange,
    startDate,
    endDate,
    scheduleType,
    instructors,
  };
}

function extractCourse(
  [titleRow, detailRow]: [Element, Element],
): Course | null {
  const nameNode = titleRow.children[0].children[0];
  if (!nameNode) {
    throw new Error(
      `Missing name node inside title row node containing text ${
        JSON.stringify(titleRow.textContent)
      }`,
    );
  }
  let stepper = new NodeStepper(nameNode.childNodes);
  let name, method, crn, subjectAndCourse, section;
  if (stepper.nodes.length <= 2) {
    [name, crn, subjectAndCourse, section] = stepper.currentNode.split(" - ");
    method = "";
  } else {
    name = stepper.currentNode;
    const nameDetails = stepper.step(2);
    [method, crn, subjectAndCourse, section] = nameDetails.split(" - ");
  }
  const [subject, courseNumber] = subjectAndCourse?.split(" ") ?? ["", ""];

  try {
    const detailNode = detailRow.children[0];
    stepper = new NodeStepper(detailNode.childNodes);
    if (!stepper.currentNode.includes("Associated Term")) {
      stepper.stepToNextNodeContaining("Associated Term");
    }
    const associatedTerm = stepper.next();
    const registrationDates = stepper.step(3);
    const [registrationStart, registrationEnd] = registrationDates.split(
      " to ",
    );
    const levels = stepper.step(3);
    const campus = stepper.step(3);
    const scheduleType = stepper.step(2);
    const fullMethod = stepper.step(2);
    const creditsWithSuffix = stepper.step(2);
    const credits = creditsWithSuffix.replace(/ Credits/, "");
    const catalogEntryLinkElement = Array.from(detailNode.querySelectorAll("a"))
      .filter((node) =>
        node.textContent.includes("View Catalog Entry")
      )[0] as Element;
    const catalogEntryLinkPath = catalogEntryLinkElement.getAttribute(
      "href",
    );
    const catalogEntryLink = catalogEntryLinkPath
      ? "https://ssb.blinn.edu:9010" + catalogEntryLinkPath
      : null;

    const scheduledMeetingTimesRows = Array.from(detailNode.querySelectorAll(
      ".datadisplaytable > tbody > tr",
    ));
    const scheduledMeetingTimes = scheduledMeetingTimesRows.slice(1).map(
      extractScheduledMeetingTime,
    );

    return {
      name,
      method: method as Method,
      crn,
      subject,
      courseNumber,
      section,

      associatedTerm,
      registrationStart,
      registrationEnd,
      levels,

      campus,
      scheduleType,
      fullMethod,
      credits,

      catalogEntryLink,

      scheduledMeetingTimes,
    };
  } catch (e) {
    console.error("Error in course", name, e);
    return null;
  }
}

export function extractCourses(document: Document): Course[] {
  const rows = Array.from(document.querySelectorAll(ROW_SELECTOR));
  if (rows.length === 0) {
    console.warn("No courses found!");
  }
  const rowsWithoutLast = rows.filter((row) =>
    !row.textContent.includes("Return to Previous")
  );
  const courseRowPairs = chunk(rowsWithoutLast, 2, null)
    .map<[Element, Element]>(
      ([a, b]) => [a as Element, b as Element],
    );
  return courseRowPairs.map(extractCourse).filter((x) => x != null) as Course[];
}

export async function fetchCourses(
  termId: string,
  subjectIds: string[],
): Promise<Course[]> {
  const formData = new FormData();
  formData.set("term_in", termId);
  const dummies = [
    "sel_subj",
    "sel_day",
    "sel_schd",
    "sel_insm",
    "sel_camp",
    "sel_levl",
    "sel_sess",
    "sel_instr",
    "sel_ptrm",
    "sel_attr",
  ];
  for (const dummy of dummies) {
    formData.append(dummy, "dummy");
  }
  for (const subjectId of subjectIds) {
    formData.append("sel_subj", subjectId);
  }
  formData.append("sel_crse", "");
  formData.append("sel_title", "");
  formData.append("sel_insm", "%");
  formData.append("sel_from_cred", "");
  formData.append("sel_to_cred", "");
  formData.append("sel_camp", "%");
  formData.append("sel_ptrm", "%");
  formData.append("sel_instr", "%");
  formData.set("begin_hh", "0");
  formData.set("begin_mi", "0");
  formData.set("begin_ap", "a");
  formData.set("end_hh", "0");
  formData.set("end_mi", "0");
  formData.set("end_ap", "a");
  const { raw, document } = await fetchDocument(ENDPOINT, {
    method: "POST",
    body: formData,
  });
  async function writeErroredFile() {
    if (
      (await Deno.permissions.query({ name: "write", path: "course.html" }))
        .state === "granted"
    ) {
      await Deno.writeTextFile("course.html", raw);
      console.error("Wrote errored file to course.html");
    }
  }
  if (!raw.includes("Sections Found")) {
    await writeErroredFile();
    throw new Error(
      'Missing "Sections Found" in course response - something went wrong!',
    );
  }
  try {
    return extractCourses(document);
  } catch (e) {
    await writeErroredFile();
    throw e;
  }
}

export interface CourseXML {
  raw: string;
  courseSubjectAbbreviation: string;
  courseNumber: string;
  courseShortTitle: string;
  courseLongTitle: string;
  courseDescription: string;
  courseEffectiveDate: string;
  courseCreditBasis: string;
  courseCreditUnits: string;
  courseCreditMinimumValue: string;
  courseLevelCode: string;
  courseLevelDescription: string;
}

export function extractCourseXML(raw: string, document: Document): CourseXML {
  function valueFromTagName(tagName: string): string {
    return document.getElementsByTagName(tagName)[0].textContent;
  }
  const courseSubjectAbbreviation = valueFromTagName(
    "CourseSubjectAbbreviation",
  );
  const courseNumber = valueFromTagName("CourseNumber");
  const courseShortTitle = valueFromTagName("CourseShortTitle");
  const courseLongTitle = valueFromTagName("CourseLongTitle");
  const courseDescription = valueFromTagName("CourseDescription");
  const courseEffectiveDate = valueFromTagName("CourseEffectiveDate");
  const courseCreditBasis = valueFromTagName("CourseCreditBasis");
  const courseCreditUnits = valueFromTagName("CourseCreditUnits");
  const courseCreditMinimumValue = valueFromTagName("CourseCreditMinimumValue");
  const courseLevelCode = valueFromTagName("CourseLevelCode");
  const courseLevelDescription = valueFromTagName("CourseLevelDescription");

  return {
    raw,
    courseSubjectAbbreviation,
    courseNumber,
    courseShortTitle,
    courseLongTitle,
    courseDescription,
    courseEffectiveDate,
    courseCreditBasis,
    courseCreditUnits,
    courseCreditMinimumValue,
    courseLevelCode,
    courseLevelDescription,
  };
}

export async function fetchCourseXML(
  termId: string,
  subjectId: string,
  courseNumber: string,
): Promise<CourseXML> {
  const formData = new FormData();
  formData.set("term_in", termId);
  formData.set("subj_in", subjectId);
  formData.set("title_in", "%%");
  formData.set("divs_in", "%");
  formData.set("dept_in", "%");
  formData.set("coll_in", "%");
  formData.set("schd_in", "");
  formData.set("levl_in", "");
  formData.set("attr_in", "");
  formData.set("crse_start_in", courseNumber);
  formData.set("crse_end_in", courseNumber);
  formData.set("cred_from_in", "");
  formData.set("cred_to_in", "");
  formData.set("last_updated", "");
  const { raw, document } = await fetchDocument(
    XML_ENDPOINT,
    {
      method: "POST",
      body: formData,
    },
    "text/xml",
  );
  return extractCourseXML(raw, document);
}

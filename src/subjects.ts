import { Document, Element } from "./deps.ts";
import { fetchDocument } from "./fetch.ts";

const ENDPOINT = "https://ssb.blinn.edu:9010/PROD/bwckgens.p_proc_term_date";
const OPTION_SELECTOR = "select[name=sel_subj] option";

export interface Subject {
  name: string;
  id: string;
}

function normalizeName(name: string): string {
  return name.replace(/^.{4} - /, "");
}

export function extractSubjects(document: Document): Subject[] {
  const options = document.querySelectorAll(OPTION_SELECTOR);
  return Array.from(options).flatMap((node) => {
    const option = node as Element;
    const name = normalizeName(option.textContent);
    const id = option.getAttribute("value");
    if (id == null || id === "") {
      return [];
    } else {
      return [{ name, id }];
    }
  });
}

export async function fetchSubjects(termId: string): Promise<Subject[]> {
  const formData = new FormData();
  formData.set("p_calling_proc", "bwckschd.p_disp_dyn_sched");
  formData.set("p_term", termId);
  const { document } = await fetchDocument(ENDPOINT, {
    method: "POST",
    body: formData,
  });
  return extractSubjects(document);
}

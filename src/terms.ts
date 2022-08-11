import { Document, Element } from "./deps.ts";
import { fetchDocument } from "./fetch.ts";

const ENDPOINT = "https://ssb.blinn.edu:9010/PROD/bwckschd.p_disp_dyn_sched";
const OPTION_SELECTOR = "select[name=p_term] option";

export interface Term {
  name: string;
  id: string;
}

export function extractTerms(document: Document): Term[] {
  const options = document.querySelectorAll(OPTION_SELECTOR);
  return Array.from(options).flatMap((node) => {
    const option = node as Element;
    const name = option.textContent;
    const id = option.getAttribute("value");
    if (id == null || id === "") {
      return [];
    } else {
      return [{ name, id }];
    }
  });
}

export async function fetchTerms(): Promise<Term[]> {
  const { document } = await fetchDocument(ENDPOINT);
  return extractTerms(document);
}

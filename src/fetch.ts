import {
  Document,
  DOMParser,
  DOMParserMimeType,
  log,
  wrapFetch,
} from "./deps.ts";

const fetch = wrapFetch();

const DEFAULT_CONTENT_TYPE = "text/html";

export async function fetchDocument(
  url: string,
  requestInit: RequestInit = {},
  contentType: DOMParserMimeType = DEFAULT_CONTENT_TYPE,
): Promise<{ raw: string; document: Document }> {
  log.debug(`Sending request to ${url}: ${JSON.stringify(requestInit)}`);
  const response = await fetch(new Request(url, requestInit));
  const raw = await response.text();
  const document = new DOMParser().parseFromString(raw, contentType);
  if (!document) throw new Error("Document failed to parse");
  return { raw, document };
}

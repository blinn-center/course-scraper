import { Document, DOMParser } from "./deps.ts";

export function parse(source: string): Document {
  const document = new DOMParser().parseFromString(source, "text/html");
  if (!document) throw new Error("Document failed to parse");
  return document;
}

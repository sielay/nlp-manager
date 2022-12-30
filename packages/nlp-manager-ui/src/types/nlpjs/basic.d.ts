declare module "@nlpjs/basic" {
  import { Nlp } from "@nlpjs/nlp";
  interface Dock {
    get: (id: "nlp") => Nlp;
  }
  const dockStart = async (options: unknown) => Dock;
}

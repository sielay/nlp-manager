declare module "@nlpjs/core" {
  import { Nlp } from "@nlpjs/nlp";
  interface Container {
    use: (something: unknown) => void;
    register: (name: string, clazz: unknown) => void;
    get: (id: "nlp") => Nlp;
  }
  const containerBootstrap = async () => Container;
}

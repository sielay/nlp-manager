declare module "@nlpjs/nlp" {
  export interface NlpResult {
    answer: string;
    intent: string;
  }
  export class Nlp {
    constructor(opts: { languages: string[]; threshold: number }): Nlp;
    process: (lang: string, text: string) => Promise<NlpResult>;
    use: (something: unknown) => void;
    container: Nlp;
    register: (something: string, what: unknown) => void;
    addDocument: (lang: string, input: string, intent: string) => void;
    addLanguage: (lang: string) => void;
    addCorpus: (fileName: string) => void;
    addCorpus: (imported: { importer: string; content: unknown }) => void;
    train: () => Promise<void>;
    addAnswer: (lang: string, intent: string, output: string) => void;
  }
}

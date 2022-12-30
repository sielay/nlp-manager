export interface CorpusEntry {
  intent: string;
  utterances: string[];
  answers: ({ answer: string; opts: string } | string)[];
}

export interface Corpus extends Record<string, unknown> {
  name: string;
  locale: string;
  data: CorpusEntry[];
}

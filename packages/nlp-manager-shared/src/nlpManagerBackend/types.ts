import { Corpus } from "../models";
import { Audit, CorpusFile, FileLike } from "../types";

export interface NlpManagerBackend {
  getCorpora: () => Promise<(Corpus & Audit)[]>;
  getVersion: () => Promise<string>;
  importFile: () => Promise<boolean>;
  ingestFile: (file: FileLike) => Promise<unknown>;
}

import { AuditedCorpus } from "../models";
import { FileLike } from "../types";

export interface NlpManagerBackend {
  getCorpora: () => Promise<Array<AuditedCorpus>>;
  getCorpus: (id: string) => Promise<AuditedCorpus | undefined>;
  getVersion: () => Promise<string>;
  importFile: () => Promise<boolean>;
  ingestFile: (file: FileLike) => Promise<unknown>;
}

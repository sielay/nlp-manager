import { getCorpora, insertCorpus } from "../models/nlp/corpus/model";
import { FileLike } from "../types";
import { ModelType } from "../types/models";
import { NlpManagerBackend } from "./types";

export const abstractBackend: NlpManagerBackend = {
  getCorpora,
  getVersion: () => Promise.resolve("0.1.0-abstract"),
  importFile: () => Promise.reject("Abstract"),
  ingestFile: async (file: FileLike): Promise<boolean> => {
    switch (file.type) {
      case ModelType.NLP_CORPUS: {
        await insertCorpus(file);
        return true;
      }
    }
    return false;
  },
};

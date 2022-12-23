import { isItCorpusFile } from "./nlp";

export * from "./nlp";

export enum ModelType {
  NLP_CORPUS = "nlp:corpus",
}

export const guessDataType = (data: unknown) => {
  if (isItCorpusFile(data)) return ModelType.NLP_CORPUS;
  return undefined;
};

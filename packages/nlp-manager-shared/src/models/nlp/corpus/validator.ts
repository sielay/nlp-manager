import { validator } from "../../../nlpManagerBackend/validator";
import * as schema from "./schema.json";
import { Corpus } from "./types";

export const isCoprusValid = (data: unknown) => {
  return validator.validate(schema, data);
};

export const isItCorpus = (data: unknown): data is Corpus => {
  const isValid = isCoprusValid(data);
  return isValid === true;
};

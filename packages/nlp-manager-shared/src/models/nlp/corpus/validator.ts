import { validator } from "../../../nlpManagerBackend/validator";
import * as schema from "./schema.json";

export const isCoprusValid = (data: unknown) => {
  return validator.validate(schema, data);
};

export const isItCorpusFile = (data: unknown) => {
  const isValid = isCoprusValid(data);
  return isValid === true;
};

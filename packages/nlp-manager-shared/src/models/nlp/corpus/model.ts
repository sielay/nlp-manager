import { getDB } from "../../../nlpManagerBackend";
import { Audit, CorpusFile } from "../../../types";
import { Model, ReturnDict } from "trilogy";
import { Corpus, CorpusEntry } from "./types";

export interface RecordType extends ReturnDict {
  name: string;
  locale: string;
  fileName: string;
  createdAt: Date;
  data: object;
  id?: number;
}

let model: Model<RecordType>;

const cast = (record: RecordType): Corpus & Audit => {
  const { name, locale, createdAt, id, data } = record;
  const result = {
    name,
    locale,
    data: data as CorpusEntry[],
    id,
    createdAt
  } satisfies Corpus & Audit;
  return result;
};

const getModel = async () => {
  if (!model) {
    const db = await getDB();
    model = (await db.model("corpus", {
      name: String,
      locale: String,
      fileName: String,
      createdAt: Date,
      data: Array,
      id: "increments",
    })) as unknown as Model<RecordType>;
  }
  return model;
};

export const insertCorpus = async (corpus: CorpusFile) => {
  const model = await getModel();
  const {
    content: { name, locale, data },
    name: fileName,
  } = corpus;
  return model.create({
    name,
    locale,
    createdAt: new Date(),
    fileName,
    data
  });
};

export const getCorpora = async () => {
  const model = await getModel();
  const records = await model.find();
  return records.map(cast);
};

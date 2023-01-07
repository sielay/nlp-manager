import { getDB } from "../../../nlpManagerBackend";
import { Audit, CorpusFile } from "../../../types";
import { Model, ReturnDict } from "trilogy";
import { AuditedCorpus, Corpus, CorpusEntry } from "./types";
import { v4 } from "uuid";

export interface RecordType extends ReturnDict {
  name: string;
  locale: string;
  fileName: string;
  createdAt: Date;
  data: object;
  id: string;
}

let model: Model<RecordType>;

const cast = (record: RecordType & Audit): AuditedCorpus => {
  const { name, locale, createdAt, id, data } = record;
  const result = {
    name,
    locale,
    data: data as CorpusEntry[],
    id,
    createdAt,
  } satisfies AuditedCorpus;
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
      id: String,
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
    data,
    id: v4(),
  });
};

export const getCorpora = async () => {
  const model = await getModel();
  const records = await model.find();
  return records.map(cast);
};

export const getCorpus = async (id?: string) => {
  if (!id) return undefined;
  const model = await getModel();
  console.log('search by id', id);
  const record = await model.findOne({ id });
  console.log((await getCorpora()).map(({id}) => id));
  console.log(record);
  return record ? cast(record) : undefined;
};

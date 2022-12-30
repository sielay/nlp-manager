// This file is meant to be loaded lazily for code splitting purposes
import { getDB, NlpManagerBackend } from "@nlp-manager/shared";
import { openFile } from "./fs/openFile";
import { abstractBackend } from "@nlp-manager/shared";

export const buildWebBackend = async (): Promise<NlpManagerBackend> => {
  const backend = {
    ...abstractBackend,
    getVersion: async (): Promise<string> => {
      const db = await getDB();
      return `Web backend version with ${typeof db}`;
    },
    importFile: async () => {
      const files = await openFile({ accept: "*.json" });
      const results = await Promise.all(files.map(backend.ingestFile));
      return results.some(Boolean);
    },
  };
  return backend;
};

export default buildWebBackend;

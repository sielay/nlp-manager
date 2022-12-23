// This file is meant to be loaded lazily for code splitting purposes
import { getDB, NlpManagerBackend } from "@nlp-manager/shared";
import { openFile } from "./fs/openFile";
import { guessDataType } from "@nlp-manager/shared";

export const buildWebBackend = async (): Promise<NlpManagerBackend> => {
  return {
    getVersion: async (): Promise<string> => {
      const db = await getDB();
      return `Web backend version with ${typeof db}`;
    },
    importFile: async () => {
      const files = await openFile({ accept: "*.json" });
      files.forEach((file) => {
        // eslint-disable-next no-debugger
        debugger;
        console.log(guessDataType(file.content))
      });
    },
  };
};

export default buildWebBackend;

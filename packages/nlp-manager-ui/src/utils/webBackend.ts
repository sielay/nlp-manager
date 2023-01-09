// This file is meant to be loaded lazily for code splitting purposes
import { getDB, NlpManagerBackend, setup } from "@nlp-manager/shared";
import { openFile } from "./fs/openFile";
import { abstractBackend } from "@nlp-manager/shared";
import { createPool, Pool } from 'generic-pool';
import { Trilogy } from 'trilogy';
import { Database } from 'sql.js';

export const toBinArray = (str: string) => {
  const l = str.length,
    arr = new Uint8Array(l);
  for (let i = 0; i < l; i++) arr[i] = str.charCodeAt(i);
  return arr;
}

export const toBinString = (arr: Uint8Array) => {
  const uarr = new Uint8Array(arr);
  const strings = [], chunksize = 0xffff;
  // There is a maximum stack size. We cannot call String.fromCharCode with as many arguments as we want
  for (let i = 0; i * chunksize < uarr.length; i++) {
    strings.push(String.fromCharCode.apply(null, uarr.subarray(i * chunksize, (i + 1) * chunksize) as unknown as number[]));
  }
  return strings.join('');
}


export const loadDB = async (): Promise<void> => {
  const db = await getDB();
  db.pool = pureConnect(db);
}

export const writeDB = (db: Database) => {
  window.localStorage.setItem("nlpm-db", toBinString(db.export()));
}

export async function readDatabase(instance: Trilogy): Promise<Database> {
  const name = instance.options.connection.filename
  const init = await import('sql.js')
  const SQL = await init.default();
  const data = localStorage.getItem("nlpm-db");
  const dataArray = data ? toBinArray(data) : undefined;
  return new SQL.Database(dataArray);
}

export function pureConnect(instance: Trilogy): Pool<Database> {
  let interval: NodeJS.Timer;
  return createPool({
    create() {
      const db = readDatabase(instance);
      void db.then((db) => {
        interval = setInterval(() => {
          writeDB(db);
        }, 5000);
      });
      return db;
    },

    async destroy(client: Database): Promise<void> {
      if (interval) {
        clearInterval(interval);
      }
      client.close()
    }
  }, { min: 1, max: 1 })
}


export const buildWebBackend = async (): Promise<NlpManagerBackend> => {
  await loadDB();
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

import { connect, Trilogy } from "trilogy";

let dbInstance: Trilogy;
const MEMORY = ":memory:";
let dbFile: string = MEMORY;

/**
 * Setup the database on app startup
 * @param file Electron app can specify local/embedded DB file to be used
 */
export const setup = (file: string) => {
  if (dbInstance) throw new Error("Database already initialized");
  dbFile = file;
};

/**
 * Get the database instance
 * @returns {Trilogy}
 */
export const getDB = async (): Promise<Trilogy> => {
  if (!dbInstance) {
    dbInstance = connect(dbFile, {
      client: dbFile !== MEMORY ? "sql.js" : undefined,
    });
  }
  return dbInstance;
};

export const reset = async () => {
  if (dbInstance) {
    await dbInstance.close();
  }
  dbInstance = undefined;
}

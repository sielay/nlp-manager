export * from "./db";

export interface NlpManagerBackend {
  getVersion: () => Promise<string>;
  importFile: () => Promise<void>;
}

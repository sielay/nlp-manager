import { ElectronAPI } from '@nlp-manager/shared';
export {};
declare global {
  declare namespace CONFIG {
    const name: string;
    const debug: boolean;
  }

  interface Window {
    electronAPI?: ElectronAPI
  }
}

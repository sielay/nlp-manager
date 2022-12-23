import { NlpManagerBackend } from '@nlp-manager/shared';
export {};
declare global {
  declare namespace CONFIG {
    const name: string;
    const debug: boolean;
  }

  interface Window {
    nlpManagerBackend?: NlpManagerBackend
  }
}

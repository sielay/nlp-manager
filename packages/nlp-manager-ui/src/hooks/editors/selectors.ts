import { EditorsContextState } from "./types";

export const selectEditor = (state: EditorsContextState, uuid: string) =>
  state.editors.find(({ instance }) => uuid === instance);

export const findEditor = (state: EditorsContextState, uuid: string) =>
  state.editors.findIndex(({ instance }) => uuid === instance);

import {
  AnyAction,
  CaseReducerActions,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Dispatch, useReducer } from "react";
import { EditorsContextState, EditorState } from "./types";

export const reducers = {
  addEditor: (
    state: EditorsContextState,
    { payload: { type, data } }: PayloadAction<{ type: string; data: unknown }>
  ) => {
    state.editors.push({
      type,
      title: `Loading ${type}...`,
      state: EditorState.LOADING,
      data,
    });
  },
  editorLoaded: (
    state: EditorsContextState,
    { payload }: PayloadAction<number>
  ) => {
    state.editors[payload].state = EditorState.LOADING;
  },
  closeEditor: (
    state: EditorsContextState,
    { payload }: PayloadAction<number>
  ) => {
    state.editors[payload].state = EditorState.CLOSING;
  },
  removeEditor: (
    state: EditorsContextState,
    { payload }: PayloadAction<number>
  ) => {
    state.editors.splice(payload, 1);
  },
  setTitle: (
    state: EditorsContextState,
    {
      payload: { title, index },
    }: PayloadAction<{ index: number; title: string }>
  ) => {
    state.editors[index].title = title;
  },
  setDirty: (
    state: EditorsContextState,
    {
      payload: { dirty, index },
    }: PayloadAction<{ index: number; dirty: boolean }>
  ) => {
    state.editors[index].state = dirty
      ? EditorState.MODIFIED
      : EditorState.OPEN;
  },
  setActive: (
    state: EditorsContextState,
    { payload }: PayloadAction<number>
  ) => {
    state.activeEditor = payload;
  },
};

const INITIAL_STATE: EditorsContextState = {
  editors: [],
};

export type UseEditorReducerResult = [
  EditorsContextState,
  Dispatch<AnyAction>,
  Partial<CaseReducerActions<typeof reducers, string>>
];

export const useEditorsReducer = (): UseEditorReducerResult => {
  const slice = createSlice<EditorsContextState, typeof reducers>({
    name: "Editors",
    reducers,
    initialState: INITIAL_STATE,
  });
  const [state, dispatch] = useReducer(slice.reducer, INITIAL_STATE);

  return [state, dispatch, slice.actions];
};

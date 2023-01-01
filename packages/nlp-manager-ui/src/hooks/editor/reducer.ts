import {
  AnyAction,
  CaseReducerActions,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createContext, Dispatch, useReducer } from "react";
import { EditorStatus } from "./consts";
import { EditorState, UseEditorResult } from "./types";

export const EditorContext = createContext<UseEditorResult | null>(null);

export const reducers = {
  setInited: (state: EditorState) => {
    state.status = EditorStatus.INITED;
  },
  setClosed: (state: EditorState) => {
    state.status = EditorStatus.CLOSED;
  },
  setSavingAndClose: (state: EditorState) => {
    state.status = EditorStatus.SAVING_AND_CLOSING;
  },
  loadFile: (state: EditorState, { payload }: PayloadAction<string>) => {
    state.status = EditorStatus.LOADING;
    state.file = payload;
  },
  newFile: (state: EditorState) => {
    state.status = EditorStatus.LOADING;
    state.file = undefined;
  },
};

const INITIAL_STATE: EditorState = {
  status: EditorStatus.INITIAL,
  file: undefined,
};

export type UseEditorReducerResult = [
  EditorState,
  Dispatch<AnyAction>,
  CaseReducerActions<typeof reducers, string>
];

export const useEditorReducer = (): UseEditorReducerResult => {
  const slice = createSlice<EditorState, typeof reducers>({
    name: "Editor",
    reducers,
    initialState: INITIAL_STATE,
  });
  const [state, dispatch] = useReducer(slice.reducer, INITIAL_STATE);

  return [state, dispatch, slice.actions];
};

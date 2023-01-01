import {
  AnyAction,
  CaseReducerActions,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Dispatch, useReducer } from "react";
import { v4 } from "uuid";
import { AppEventType, EditorEventType, EditorStatus } from "../editor/consts";
import { EditorEvent } from "../editor/types";
import { findEditor, selectEditor } from "./selectors";
import { EditorsContextState } from "./types";

export const reducers = {
  addEditor: (
    state: EditorsContextState,
    {
      payload: { editor, file },
    }: PayloadAction<{ editor: string; file?: string }>
  ) => {
    state.editors.push({
      instance: v4(),
      editor,
      title: `Loading ${editor}...`,
      state: EditorStatus.LOADING,
      file,
    });
  },
  editorLoaded: (
    state: EditorsContextState,
    { payload }: PayloadAction<string>
  ) => {
    // state.editors[payload].state = EditorStatus.LOADING;
  },
  closeEditor: (
    state: EditorsContextState,
    { payload: instance }: PayloadAction<string>
  ) => {
    const editor = selectEditor(state, instance);
    if (!editor) return;
    editor.state = EditorStatus.CLOSING;
    editor.nextEvent = {
      type: AppEventType.CLOSE,
    };
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
      payload: { title, instance },
    }: PayloadAction<{ instance: string; title: string }>
  ) => {
    const editor = selectEditor(state, instance);
    if (!editor) return;
    editor.title = title;
  },
  setDirty: (
    state: EditorsContextState,
    {
      payload: { dirty, index },
    }: PayloadAction<{ index: number; dirty: boolean }>
  ) => {
    state.editors[index].state = dirty
      ? EditorStatus.MODIFIED
      : EditorStatus.OPEN;
  },
  setActive: (
    state: EditorsContextState,
    { payload }: PayloadAction<string>
  ) => {
    state.activeEditor = payload;
  },
  onMessage: (
    state: EditorsContextState,
    {
      payload: {
        instance,
        data: { type },
      },
    }: PayloadAction<{ instance: string; data: EditorEvent }>
  ) => {
    switch (type) {
      case EditorEventType.INITED: {
        const editor = selectEditor(state, instance);
        if (!editor) return;
        const { file } = editor;
        if (file) {
          editor.nextEvent = {
            type: AppEventType.LOAD,
            data: file,
          };
          return;
        }
        editor.nextEvent = {
          type: AppEventType.NEW,
        };
        break;
      }
      case EditorEventType.CLOSED: {
        const editorIndex = findEditor(state, instance);
        if (editorIndex === -1) return;
        state.editors.splice(editorIndex, 1);
      }
    }
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

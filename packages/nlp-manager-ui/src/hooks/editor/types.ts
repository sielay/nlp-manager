import { CaseReducerActionsVoid } from "../types";
import { AppEventType, EditorEventType, EditorStatus } from "./consts";
import { Reducers } from "./reducer";

interface BaseEditorEvent<Type extends EditorEventType> {
  type: Type;
}

interface BaseEditorPayloadEvent<Type extends EditorEventType, D> {
  type: Type;
  data: D;
}

export type EditorEvent = BaseEditorEvent<
  EditorEventType.INITED | EditorEventType.CLOSED | EditorEventType.LOADED
>;

interface BaseAppEvent<Type extends AppEventType> {
  type: Type;
}

interface BaseAppPayloadEvent<Type extends AppEventType, D> {
  type: Type;
  data: D;
}

export type AppEvent =
  | BaseAppPayloadEvent<AppEventType.LOAD, string>
  | BaseAppEvent<AppEventType.NEW | AppEventType.CLOSE | AppEventType.DESTROY>;

export type FrameEvent = AppEvent | EditorEvent;

export interface UseEditorResult {
  state: EditorState;
  actions: Partial<CaseReducerActionsVoid<Reducers>>;
}

export interface EditorState {
  status: EditorStatus;
  id?: string;
}

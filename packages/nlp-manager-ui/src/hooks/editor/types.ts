import { AppEventType, EditorEventType, EditorStatus } from "./consts";

export type ExternalEditorStatuss =
  | EditorStatus.CLOSED
  | EditorStatus.OPEN
  | EditorStatus.MODIFIED
  | EditorStatus.SAVING
  | EditorStatus.SAVING_AND_CLOSING;

interface BaseEditorEvent<Type extends EditorEventType> {
  type: Type;
}

interface BaseEditorPayloadEvent<Type extends EditorEventType, D> {
  type: Type;
  data: D;
}

export type EditorEvent =
  | BaseEditorEvent<EditorEventType.INITED>
  | BaseEditorEvent<EditorEventType.CLOSED>;

interface BaseAppEvent<Type extends AppEventType> {
  type: Type;
}

interface BaseAppPayloadEvent<Type extends AppEventType, D> {
  type: Type;
  data: D;
}

export type AppEvent =
  | BaseAppPayloadEvent<AppEventType.LOAD, string>
  | BaseAppEvent<AppEventType.NEW>
  | BaseAppEvent<AppEventType.CLOSE>;

export type FrameEvent = AppEvent | EditorEvent;

export interface UseEditorResult {
  status: EditorStatus;
}

export interface EditorState {
  status: EditorStatus;
  file?: string;
}

import { AppEventTypes, EditorEventTypes } from "./consts";
import { AppEvent, EditorEvent } from "./types";

export const isAppEvent = (
  event: MessageEvent<AppEvent>
): event is MessageEvent<AppEvent> => {
  if (typeof event.data !== "object") return false;
  const { type } = event.data;
  if (typeof type !== "string") return false;
  return AppEventTypes.includes(type);
};

export const isEditorEvent = (
  event: MessageEvent<EditorEvent>
): event is MessageEvent<EditorEvent> => {
  if (typeof event.data !== "object") return false;
  const { type } = event.data;
  if (typeof type !== "string") return false;
  return EditorEventTypes.includes(type);
};

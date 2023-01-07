import { EditorEvent } from "./types";

export function sendPostMessage(event: EditorEvent): EditorEvent {
  try {
    window.postMessage(event, "*");
  } catch (error) {
    console.error(error);
  }
  return event;
}

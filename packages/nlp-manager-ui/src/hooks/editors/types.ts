import { EditorStatus } from "../editor/consts";
import { AppEvent } from "../editor/types";

export interface Editor {
  instance: string;
  editor: string;
  id?: string;
  title: string;
  state: EditorStatus;
  nextEvent?: AppEvent;
}

export interface EditorsContextState {
  activeEditor?: string;
  editors: Editor[];
}

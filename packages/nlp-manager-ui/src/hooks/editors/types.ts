export enum EditorState {
  LOADING = "loading",
  OPEN = "open",
  MODIFIED = "open:modified",
  SAVING = "saving",
  CLOSING = "closing",
}

export interface Editor {
  type: string;
  data: unknown;
  title: string;
  state: EditorState;
}

export interface EditorsContextState {
  activeEditor?: number;
  editors: Editor[];
}

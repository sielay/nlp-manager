import { useContext } from "react";
import { UseEditorResult } from "./types";
import { EditorContext } from "./context";

export function useEditor(): UseEditorResult {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(
      "useEditor hooks is attempting to be used out side of its provider"
    );
  }

  return context;
}

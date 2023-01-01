import { EditorEvent } from "../editor/types";
import { useEditorsContext } from "./context";

export const useEditors = () => {
  const context = useEditorsContext();
  const [state, dispatch, { addEditor, closeEditor, setActive, onMessage }] =
    context;
  return {
    state,
    addEditor: (editor: string, file?: string) =>
      addEditor && dispatch(addEditor({ editor, file })),
    closeEditor: (instance: string) => {
      closeEditor && dispatch(closeEditor(instance));
    },
    setActive: (instance: string) => {
      setActive && dispatch(setActive(instance));
    },
    onMessage: (instance: string, data: EditorEvent) => {
      onMessage && dispatch(onMessage({ instance, data }));
    },
  };
};

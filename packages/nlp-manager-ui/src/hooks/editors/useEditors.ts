import { EditorEvent } from "../editor/types";
import { useEditorsContext } from "./context";

export const useEditors = () => {
  const context = useEditorsContext();
  const [state, dispatch, { addEditor, closeEditor, setActive, onMessage }] =
    context;
  return {
    state,
    addEditor: (editor: string, id?: string) => {
      console.log(`Add editor ${editor} with asset ${id}`);
      addEditor && dispatch(addEditor({ editor, id }));
    },
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

import { useEditorsContext } from "./context";

export const useEditors = () => {
  const context = useEditorsContext();
  const [state, dispatch, { addEditor, closeEditor, setActive }] = context;
  return {
    state,
    addEditor: (type: string, data: unknown) =>
      addEditor && dispatch(addEditor({ type, data })),
    closeEditor: (index: number) => {
      closeEditor && dispatch(closeEditor(index));
    },
    setActive: (index: number) => {
      setActive && dispatch(setActive(index));
    },
  };
};

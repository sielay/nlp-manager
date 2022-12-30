import { useEditorsContext } from "./context";

export const useEditor = (index: number) => {
  const context = useEditorsContext();
  const [state, dispatch, { editorLoaded }] = context;
  return {
    state,
    editorLoaded: () => editorLoaded && dispatch(editorLoaded(index)),
  };
};

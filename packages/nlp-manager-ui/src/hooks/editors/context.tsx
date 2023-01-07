import { UseEditorReducerResult, useEditorsReducer } from "./reducer";
import { createContext, PropsWithChildren, useContext } from "react";

const NOOP = () => {
  /* not inited */
};

const EditorsContext = createContext<UseEditorReducerResult>([
  {
    editors: [],
  },
  NOOP,
  {},
]);

export function EditorsProvider({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  const result = useEditorsReducer();
  return (
    <EditorsContext.Provider value={result}>{children}</EditorsContext.Provider>
  );
}

export const useEditorsContext = () => {
  const context = useContext(EditorsContext);
  return context;
};

import { useEffect, useState } from "react";
import { UseQueryResult } from "react-query";
import { appNotReadyStates, EditorStatus, useEditor } from "../editor";
import { QueryHook } from "../types";

export const useEditSession = <T>({
  serverHook,
  newGenerator,
}: {
  serverHook: QueryHook<T>;
  newGenerator: () => T;
}) => {
  const {
    state: { status, id },
    actions,
  } = useEditor();
  const enabled = !appNotReadyStates.includes(status);
  const [localState, setLocalState] = useState<T | undefined>();
  const { data } = serverHook(id);


  useEffect(() => {    
    if (status === EditorStatus.LOADING && !localState) {
      if (!id) {
        setLocalState(newGenerator());
        actions.setLoaded?.();
        return;
      }
      // react-query may return the data later
      if (data) {
        setLocalState(data);
        actions.setLoaded?.();
      }
    }
  }, [status, localState, id, data]);

  return {
    id,
    status,
    localState,
    setLocalState,
  };
};

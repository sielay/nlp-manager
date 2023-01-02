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

  useEffect(() => {
    if (enabled && !localState) {
      if (!id) {
        setLocalState(newGenerator());
        actions.setLoaded?.();
        return;
      }
    }
  }, [enabled, localState, id]);

  return {
    id,
    status,
    localState,
    setLocalState,
  };
};

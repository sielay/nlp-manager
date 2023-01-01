import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { ErrorBoundary } from "../../components/ErrorBounduary";
import { AppEventType, EditorEventType, EditorStatus } from "./consts";
import { RecoveryEditor } from "./RecoveryEditor";
import { useEditorReducer } from "./reducer";
import { sendPostMessage } from "./sendPostMessage";
import { AppEvent, EditorState, UseEditorResult } from "./types";

export const EditorContext = createContext<UseEditorResult>({
  status: EditorStatus.INITIAL,
});

export const reducers = {};

export function EditorProvider({
  children,
  onDestroy,
}: PropsWithChildren<{ onDestroy?: VoidFunction }>): JSX.Element {
  const [
    { status },
    dispatch,
    { setClosed, setSavingAndClose, setInited },
  ] = useEditorReducer();
  const ref = useRef<boolean>(false);

  useEffect(() => {
    setInited && dispatch(setInited());
    sendPostMessage({ type: EditorEventType.INITED });
  }, []);

  const handler = (event: MessageEvent<AppEvent>) => {
    const {
      data: { type },
      data,
    } = event;

    /* istanbul ignore next */
    if (
      (event as MessageEvent<unknown>).data === "blueprint-table-post-message"
    ) {
      /* istanbul ignore next */
      return;
    }
    /* istanbul ignore next */
    if (!ref.current) {
      /* istanbul ignore next */
      /* istanbul ignore next */
      return;
    }

    console.log("event data", data);

    // todo: check if we need those limbo states
    switch (type) {
      case AppEventType.NEW: {

        break;
      }
      case AppEventType.LOAD: {

        break;
      }
      case AppEventType.CLOSE: {
        // useCallback would cache here the first version
        // of the state, but we have a cool feature to avoid
        // it
        // dispatchFn((state: EditorState, dispatch) => {
        switch (status) {
          case EditorStatus.INITED:
          case EditorStatus.OPEN: {
            setClosed && dispatch(setClosed());
            sendPostMessage({ type: EditorEventType.CLOSED });
            return;
          }
          case EditorStatus.MODIFIED: {
            setSavingAndClose && dispatch(setSavingAndClose());
            return;
          }
        }
        console.error("Unknown", status, event);
        // });
        break;
      }
      // case AppEventType.DESTROY: {
      //   // dispatch(EditorStat.DESTROYED);
      //   break;
      // }
    }
  };

  useEffect(() => {
    /* istanbul ignore next */
    if (ref.current) {
      return;
    }
    ref.current = true;
    window.addEventListener("message", handler);
    // yay for stopping memory leaking 🎊
    return () => {
      ref.current = false;
      // we won't remote the listener, it will die with the frame
      window.removeEventListener("message", handler);
    };
  }, [handler]);

  // unmount the children so that react state is reset
  return (
    <EditorContext.Provider
      value={{
        status,
      }}
    >
      <ErrorBoundary onErrorComponent={RecoveryEditor}>
        {status === EditorStatus.DESTROYED ? <div /> : children}
      </ErrorBoundary>
    </EditorContext.Provider>
  );
}

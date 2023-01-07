import { CaseReducerActions } from "@reduxjs/toolkit";
import { createContext, PropsWithChildren, useEffect, useRef } from "react";
import { ErrorBoundary } from "../../components/ErrorBounduary";
import { AppEventType, EditorEventType, EditorStatus } from "./consts";
import { RecoveryEditor } from "./RecoveryEditor";
import { useEditorReducer } from "./reducer";
import { sendPostMessage } from "./sendPostMessage";
import { AppEvent, UseEditorResult } from "./types";
import { isAppEvent } from "./utils";

export const EditorContext = createContext<UseEditorResult>({
  state: { status: EditorStatus.INITIAL },
  actions: {},
});

export const reducers = {};

export function EditorProvider({
  children,
  onDestroy,
}: PropsWithChildren<{ onDestroy?: VoidFunction }>): JSX.Element {
  const [
    state,
    dispatch,
    { setClosed, setSavingAndClose, setInited, loadFile, newFile, setLoaded },
  ] = useEditorReducer();
  const ref = useRef<boolean>(false);
  const { status } = state;

  useEffect(() => {
    setInited && dispatch(setInited());
    sendPostMessage({ type: EditorEventType.INITED });
  }, []);

  const handler = (event: MessageEvent<AppEvent>) => {
    const {
      data,
      data: { type },
    } = event;

    /* istanbul ignore next */
    if (!isAppEvent(event)) {
      /* istanbul ignore next */
      return;
    }
    /* istanbul ignore next */
    if (!ref.current) {
      /* istanbul ignore next */
      /* istanbul ignore next */
      return;
    }

    console.log("IN EDITOR", type, data);

    // If you use property rather than destructed const
    // TypeScript can deduct the other properties of the event
    // without cassting
    switch (data.type) {
      case AppEventType.NEW: {
        dispatch(newFile());
        break;
      }
      case AppEventType.LOAD: {
        dispatch(loadFile(data.data));
        break;
      }
      case AppEventType.CLOSE: {
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
        console.error("Unheld event type", data.type, data);
        break;
      }
      case AppEventType.DESTROY: {
        // This has to be implemented by a specific editor
        break;
      }
      default: {
        console.error("Unheld event type", type, data);
      }
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
        state,
        actions: {
          setLoaded: () => {
            dispatch(setLoaded());
            sendPostMessage({ type: EditorEventType.LOADED });
          },
          setClosed: () => {
            dispatch(setClosed());
          },
          setInited: () => {
            dispatch(setInited());
          },
          setSavingAndClose: () => {
            dispatch(setSavingAndClose());
          },
          newFile: () => {
            dispatch(newFile());
          },
          loadFile: (id: string) => {
            dispatch(loadFile(id));
          },
        },
      }}
    >
      <ErrorBoundary onErrorComponent={RecoveryEditor}>
        {status === EditorStatus.DESTROYED ? <div /> : children}
      </ErrorBoundary>
    </EditorContext.Provider>
  );
}

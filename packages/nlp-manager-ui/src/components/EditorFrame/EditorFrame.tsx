import React, {
  FC,
  forwardRef,
  memo,
  RefAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  EditorEvent,
  EditorEventType,
  EditorEventTypes,
  isEditorEvent,
} from "../../hooks/editor";
import { useEditors } from "../../hooks/editors";
import { selectEditor } from "../../hooks/editors/selectors";

export interface EditorFrameProps {
  instance: string;
  editorApp: string;
}

const MemoizedIframe: FC<
  React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > &
    RefAttributes<HTMLIFrameElement>
> = memo(
  forwardRef((props, ref) => (
    <iframe
      ref={(element) => {
        if (ref) {
          if (typeof ref === "function") {
            return ref(element);
          }
          ref.current = element;
        }
      }}
      {...props}
    />
  ))
);

export const EditorFrame: FC<EditorFrameProps> = ({ instance, editorApp }) => {
  const [src, setSrc] = useState<string>(`/ui/${editorApp}`);
  const ref = useRef<HTMLIFrameElement>(null);
  const { onMessage, state } = useEditors();
  const editor = selectEditor(state, instance);
  const { nextEvent } = editor || {};

  const handler = useCallback(
    (event: MessageEvent<EditorEvent>) => {
      isEditorEvent(event) && onMessage && onMessage(instance, event.data);
    },
    [onMessage, instance]
  );

  useEffect(() => {
    ref.current?.contentWindow?.addEventListener("message", handler);
    setSrc(`/ui/${editorApp}`);
    return () =>
      ref.current?.contentWindow?.removeEventListener("message", handler);
  }, [handler, editor, setSrc, ref]);

  useEffect(() => {
    if (!nextEvent) return;
    ref.current?.contentWindow?.postMessage(nextEvent, "*");
  }, [ref, nextEvent]);

  return (
    <MemoizedIframe
      ref={ref}
      title={"Loading..."}
      src={src}
      className="border w-full h-full"
    ></MemoizedIframe>
  );
};

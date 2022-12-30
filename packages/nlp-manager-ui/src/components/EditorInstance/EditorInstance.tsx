import React, {
  memo,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  RefAttributes,
} from "react";

export interface EditorInstanceProps {
  id: number;
  editor: string;
  onMessage?: (id: number, event: unknown) => void;
  nextEvent?: unknown;
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

export const EditorInstance: FC<EditorInstanceProps> = ({
  id,
  editor,
  onMessage,
  nextEvent,
}) => {
  const [src, setSrc] = useState<string>(`/ui/${editor}`);
  const ref = useRef<HTMLIFrameElement>(null);

  const handler = useCallback(
    (event: MessageEvent<unknown>) => {
      if (
        (event as MessageEvent<unknown>).data === "blueprint-table-post-message"
      )
        return;
      onMessage && onMessage(id, event.data);
    },
    [onMessage, id]
  );

  useEffect(() => {
    ref.current?.contentWindow?.addEventListener("message", handler);
    setSrc(`/ui/${editor}`);
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
      title={"Loading"}
      src={src}
      className="border border-red-400 border-2 w-full h-full"
    ></MemoizedIframe>
  );
};

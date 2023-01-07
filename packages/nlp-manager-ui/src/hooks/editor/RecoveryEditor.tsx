import { NonIdealState } from "@blueprintjs/core";
import { FC } from "react";
import { useEditor } from "./useEditor";

export const RecoveryEditor: FC<{ error?: Error }> = ({ error }) => {
  const status = useEditor();

  //   useEffect(() => {
  //     switch (state) {
  //       // reopeining
  //       case EditorState.CLEANUP:
  //       case EditorState.LOADING: {
  //         dispatch(EditorState.OPEN);
  //         break;
  //       }
  //       case EditorState.CLOSING: {
  //         dispatch(EditorState.CLOSED);
  //         break;
  //       }
  //     }
  //   }, [state, dispatch]);

  return (
    <NonIdealState
      icon="error"
      title="There was an issue with this editor"
      description="We did all to capture your work and sent a report to our team. Please try to close it and open again."
    >
      <pre className="text-sm max-w-md overflow-auto overflow-y-auto break-words">
        {error?.message}
        {"\n\n"}
        {error?.name}
        {"\n\n"}
        {error?.stack}
      </pre>
    </NonIdealState>
  );
};

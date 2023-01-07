import { FC } from "react";
import { CorpusEditor } from "./CorpusEditor";
import { EditorProvider } from "../../hooks/editor";

const Editor: FC<unknown> = () => {
  return (
    <EditorProvider>
      <CorpusEditor />
    </EditorProvider>
  );
};

export default Editor;

import { Tree } from "@blueprintjs/core";
import { FC, useEffect } from "react";
import { useCorpora } from "../../hooks";
import { useSidebarState } from "./reducer";

export const Sidebar: FC<unknown> = () => {
  const { data: corpora } = useCorpora();
  const [contents, dispatch, { onClick, onCollapse, onExpaned, onCorpora }] =
    useSidebarState();
  useEffect(() => {
    corpora && dispatch(onCorpora(corpora));
  }, [corpora]);
  return (
    <Tree
      onNodeCollapse={(node) => dispatch(onCollapse(node))}
      onNodeExpand={(node) => dispatch(onExpaned(node))}
      onNodeClick={(node) => dispatch(onClick(node))}
      contents={contents}
    />
  );
};

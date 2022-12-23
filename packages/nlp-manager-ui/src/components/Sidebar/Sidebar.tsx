import { Tree } from "@blueprintjs/core";
import { FC } from "react";
import { useSidebarState } from "./reducer";

export const Sidebar: FC<unknown> = () => {
  const [contents, dispatch, { onClick, onCollapse, onExpaned }] =
    useSidebarState();
  return (
    <Tree
      onNodeCollapse={(node) => dispatch(onCollapse(node))}
      onNodeExpand={(node) => dispatch(onExpaned(node))}
      onNodeClick={(node) => dispatch(onClick(node))}
      contents={contents}
    />
  );
};

import { Tree, TreeNodeInfo } from "@blueprintjs/core";
import { FC, useEffect } from "react";
import { useCorpora } from "../../hooks";
import { useEditors } from "../../hooks/editors";
import { useSidebarState } from "./reducer";
import { NodeData, NodeDataType } from "./types";

export const Sidebar: FC<unknown> = () => {
  const { data: corpora } = useCorpora();
  const [contents, dispatch, { onClick, onCollapse, onExpaned, onCorpora }] =
    useSidebarState();
  const { addEditor } = useEditors();
  useEffect(() => {
    corpora && dispatch(onCorpora(corpora));
  }, [corpora]);

  const onDoubleClick = (node: TreeNodeInfo<unknown>) => {
    if (!node.nodeData) return;
    const data = node.nodeData as NodeData;
    if (data.type === NodeDataType.FILE) {
      addEditor(data.editor, data.id);
    }
  };

  return (
    <Tree
      onNodeCollapse={(node) => dispatch(onCollapse(node))}
      onNodeExpand={(node) => dispatch(onExpaned(node))}
      onNodeClick={(node) => dispatch(onClick(node))}
      onNodeDoubleClick={onDoubleClick}
      contents={contents}
    />
  );
};

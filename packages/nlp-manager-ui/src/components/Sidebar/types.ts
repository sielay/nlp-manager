export enum NodeDataType {
  FILE = "file",
}

export interface FileNodeData {
  type: NodeDataType.FILE;
  editor: string;
  id: string;
}

export type NodeData = FileNodeData;

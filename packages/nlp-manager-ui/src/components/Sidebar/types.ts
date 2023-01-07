export enum NodeDataType {
  FILE = "file",
}

export interface FileNodeData {
  type: NodeDataType.FILE;
  editor: string;
  file: string;
}

export type NodeData = FileNodeData;

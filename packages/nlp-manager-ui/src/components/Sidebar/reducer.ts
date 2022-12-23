import { TreeNodeInfo } from "@blueprintjs/core";
import {
  AnyAction,
  CaseReducerActions,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Dispatch, useReducer } from "react";

type Item = TreeNodeInfo<unknown>;
type State = Item[];

const INITIAL_STATE: State = [
  {
    id: "nlp.cores",
    icon: "heart-broken",
    label: "NLP Cores",
    isExpanded: true,
    childNodes: [
      {
        id: "nlp.cores.user",
        label: "Local",
      },
      {
        id: "np.cores.system",
        label: "System",
      },
    ],
  },
  {
    id: "bot.dlg",
    icon: "chat",
    label: "Dialog files",
  },
  {
    id: "bot.dlt",
    icon: "lab-test",
    label: "Dialog tests",
  },
];

const findNode = (tree: State, clicked: Item): Item | undefined => {
  for (const node of tree) {
    if (node.id === clicked.id) return node;
    if (node.childNodes) {
      const found = findNode(node.childNodes, clicked);
      if (found) return found;
    }
  }
};

const findNodeWithChildren = (tree: State, clicked: Item): Item | undefined => {
  const node = findNode(tree, clicked);
  if (!node?.childNodes) return undefined;
  return node;
};

const toggleNode = (tree: State, clicked: Item, force?: boolean): boolean => {
  const node = findNodeWithChildren(tree, clicked);
  if (!node) return false;
  if (force === true) return (node.isExpanded = true);
  if (force === false) return (node.isExpanded = false);
  return (node.isExpanded = !node.isExpanded);
};

export const reducers = {
  onCollapse: (state: State, { payload }: PayloadAction<Item>) => {
    toggleNode(state, payload, false);
  },
  onExpaned: (state: State, { payload }: PayloadAction<Item>) => {
    toggleNode(state, payload, true);
  },
  onClick: (state: State, { payload }: PayloadAction<Item>) => {
    toggleNode(state, payload);
  },
};

export const useSidebarState = (): [
  State,
  Dispatch<AnyAction>,
  CaseReducerActions<typeof reducers, string>
] => {
  const slice = createSlice<State, typeof reducers>({
    name: "Sidebar",
    reducers,
    initialState: INITIAL_STATE,
  });
  const [state, dispatch] = useReducer(slice.reducer, INITIAL_STATE);
  return [state, dispatch, slice.actions];
};

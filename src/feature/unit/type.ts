import {
  flattenTree,
  ITreeViewOnNodeSelectProps,
} from 'react-accessible-treeview';
export type ITreeNode = Parameters<typeof flattenTree>[0];

export interface ISelectable {
  selectedIds?: string[];
  selectable?: boolean;
  onNodeSelect?: (props: ITreeViewOnNodeSelectProps) => void;
}

export interface ITree extends ISelectable {
  data: ITreeNode;
}

export interface ITreeUnit extends ISelectable {}

import { useOrgStore } from '~/store/org';
import Tree, { ITreeNode } from './tree';
import { IOrg } from '~/type/org';
import { useMemo } from 'react';
import _ from 'lodash';
import { ITreeUnit } from './type';

const insertOrgIntoTree = (o: IOrg, tree: ITreeNode): boolean => {
  const pId = o.parentid;
  if (!tree?.children?.length) {
    tree.children = [];
  }

  for (let i = 0; i < tree.children?.length; i++) {
    const item = tree.children[i];
    if (item.id === pId) {
      if (!item?.children?.length) {
        item.children = [];
      }
      item.children?.push(o);
      return true;
    }
    insertOrgIntoTree(o, item);
  }
  return false;
};

const orgTree2View = (data: IOrg[]): ITreeNode => {
  if (!data?.length) return {} as ITreeNode;
  data = _.cloneDeep(data);

  const sortedData = data.sort((a, b) => a.grade - b.grade);

  const tree = { name: '', children: [] } as ITreeNode;

  sortedData.forEach((d) => {
    if (d.grade === 0) {
      tree.children?.push(d);
      return;
    }
    insertOrgIntoTree(d, tree);
  });
  return tree;
};

const TreeUnit = ({ selectedIds, selectable, onNodeSelect }: ITreeUnit) => {
  const { orgs } = useOrgStore();
  const data = useMemo(() => orgTree2View(orgs), [orgs]);

  return (
    <div>
      <Tree
        data={data}
        selectedIds={selectedIds}
        selectable={selectable}
        onNodeSelect={onNodeSelect}
      />
    </div>
  );
};

export default TreeUnit;

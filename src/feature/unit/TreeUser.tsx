import _ from 'lodash';
import { useEffect, useState } from 'react';
import { getUserTree } from '~/service/user';
import { useUserTreeStore } from '~/store/userTree';
import Tree from './tree';
import { ITreeUnit } from './type';

function collectAndTransformData(data: Node[]) {
  const orgIds: string[] = [];

  function transformNode(node: any) {
    let transformedNode: any = { ...node };

    // Handle current node
    if ('orgid' in node) {
      orgIds.push(node.orgid);
      transformedNode.id = node.orgid;
      transformedNode.type = 'org';
    } else if ('userid' in node) {
      transformedNode.id = node.userid;
      transformedNode.type = 'user';
    }

    // Handle children if they exist
    if (node.children) {
      transformedNode.children = node.children.map(transformNode);
    }

    return transformedNode;
  }

  const transformedData = data.map(transformNode);
  return { transformedData, orgIds: _.uniq(orgIds) };
}

const TreeUser = ({
  selectedIds,
  selectable,
  onNodeSelect,
  title,
}: ITreeUnit) => {
  const [data, setData] = useState({});
  const { counter } = useUserTreeStore();
  // const { orgs } = useOrgTreeStore();
  // const orgIds = useMemo(() => orgs.map((o) => o.id), [orgs]);

  useEffect(() => {
    getUserTree()
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          // const { tree, orgIds: orgs } = transformTreeGetOrgIds(data);
          const { transformedData: tree, orgIds: orgs } =
            collectAndTransformData(data);
          console.log({ tree, orgs });
          // setOrgIds(orgs);
          setData({ name: '', children: tree });
        }
      })
      .catch((err) => {
        console.log(err?.data && err.data);
      });
  }, [counter]);

  return (
    <div className="w-3/12 ml-8 mt-8  rounded-l-xl shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)]">
      {title && <h1 className="text-xl">{title}</h1>}
      <Tree
        data={data}
        // disabledIds={orgIds}
        selectedIds={selectedIds}
        selectable={selectable}
        onNodeSelect={onNodeSelect}
      />
    </div>
  );
};

export default TreeUser;

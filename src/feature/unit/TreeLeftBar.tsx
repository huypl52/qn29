import { useUserTreeStore } from '~/store/userTree';
import TreeUnit from './TreeUnit';
import { ITreeLeftBar } from './type';
import TreeUser from './TreeUser';

const TreeLeftBar = ({ children }: ITreeLeftBar) => {
  const { selectedNodeId, selectNode } = useUserTreeStore();
  return (
    <div className="flex w-full h-full">
      <TreeUser
        onNodeSelect={(v) => selectNode(v.element.id as string)}
        title="Cây đơn vị"
      />
      {children}
    </div>
  );
};

export default TreeLeftBar;

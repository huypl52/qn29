import { useUserTreeStore } from '~/store/userTree';
import { ITreeLeftBar } from './type';
import TreeUser from './TreeUser';
import { getUserRole } from '~/storage/auth';
import { ERole } from '~/type/user';

const TreeLeftBar = ({ children }: ITreeLeftBar) => {
  const { selectNode } = useUserTreeStore();
  const userRole = getUserRole();
  const isAdmin = userRole === ERole.admin ? true : false;

  return (
    <div className="flex w-full h-full">
      {isAdmin && (
        <TreeUser
          onNodeSelect={(v) => selectNode(v.element.id as string)}
          title="Cây đơn vị"
        />
      )}
      {children}
    </div>
  );
};

export default TreeLeftBar;

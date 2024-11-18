import { useEffect } from 'react';
import { getUserRole } from '~/storage/auth';
import { useUserTreeStore } from '~/store/userTree';
import { ERole } from '~/type/user';
import TreeUser from './TreeUser';
import { ITreeLeftBar } from './type';

const TreeLeftBar = ({ children }: ITreeLeftBar) => {
  const { selectNode } = useUserTreeStore();
  const userRole = getUserRole();
  const isUser = userRole === ERole.user ? true : false;

  useEffect(() => {
    selectNode(undefined);
  }, [selectNode]);

  return (
    <div className="flex w-full h-full">
      {!isUser && (
        <TreeUser
          onNodeSelect={(v) =>
            selectNode(v.isSelected ? (v.element.id as string) : undefined)
          }
          title="Cây đơn vị"
        />
      )}
      {children}
    </div>
  );
};

export default TreeLeftBar;

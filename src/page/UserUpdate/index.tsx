import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import UserForm from '~/component/UserForm';
import TreeLeftBar from '~/feature/unit/TreeLeftBar';
import {
  deleteUser,
  getUserDetail,
  putUser,
  registerUser,
  restoreUser,
} from '~/service/user';
import { useUserTreeStore } from '~/store/userTree';
import { toastMsg } from '~/type';
import { IUser } from '~/type/user';

const UserUpdate = () => {
  const { increment, selectedNodeId } = useUserTreeStore();
  // const user = useMemo(() => {}, [selectedNodeId])
  const [user, setUser] = useState<IUser>();
  const ref = useRef(null);

  useEffect(() => {
    if (!selectedNodeId) return;
    (async () => {
      const _user = await getUserDetail(selectedNodeId).then((res) => {
        const { status, data } = res;
        if (status !== 200) {
          return;
        }
        return data;
      });

      if (_user) setUser(_user);
    })();
  }, [selectedNodeId]);

  const handleSubmit = async (u: Partial<IUser>): Promise<boolean> => {
    if (!u?.id) return false;
    return putUser(u as IUser)
      .then((res) => {
        const { status, data } = res;
        console.log({ status, data });
        if (status !== 200) {
          throw new Error();
        }
        toast.success(toastMsg.success);
        setUser(u as IUser);
        increment();
        return true;
      })
      .catch((error) => {
        error?.data ? toast.error(error.data) : toast.error(toastMsg.error);
        return false;
      });
  };

  const handleDel = useCallback(() => {
    if (!user?.id) return;
    deleteUser(user.id)
      .then((res) => {
        const { status, data } = res;
        if (status !== 200) {
          throw new Error(data);
        }
        setUser((prev) => (prev ? { ...prev, is_deleted: true } : prev));
        increment();
        toast.success(toastMsg.success);
      })
      .catch((err) => {
        toast.error(err?.data ? err.data : toastMsg.error);
      });
  }, [user]);

  const handleRestore = useCallback(() => {
    if (!user?.id) return;
    restoreUser(user.id)
      .then((res) => {
        const { status, data } = res;
        if (status !== 200) {
          throw new Error(data);
        }
        setUser((prev) => (prev ? { ...prev, is_deleted: false } : prev));
        increment();
        toast.success(toastMsg.success);
      })
      .catch((err) => {
        toast.error(err?.data ? err.data : toastMsg.error);
      });
  }, [user]);

  return (
    <div className="relative w-full h-full">
      <TreeLeftBar>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <UserForm
            ref={ref}
            title={
              user?.is_deleted ? (
                <h2 className="text-2xl font-bold mb-4 text-red-600">Đã xóa</h2>
              ) : (
                <h2 className="text-2xl font-bold mb-4">Cập nhật</h2>
              )
            }
            onSubmit={handleSubmit}
            footer={
              <>
                {user?.is_deleted ? (
                  <button
                    type="button"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={handleRestore}
                  >
                    Khôi phục
                  </button>
                ) : (
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={() => {
                        ref.current?.submit();
                      }}
                    >
                      Lưu
                    </button>
                    <button
                      type="button"
                      onClick={handleDel}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </div>
                )}
              </>
            }
            initValue={user}
          />
        </div>
      </TreeLeftBar>
    </div>
  );
};

export default UserUpdate;

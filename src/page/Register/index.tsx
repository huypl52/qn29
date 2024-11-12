import { toast } from 'react-toastify';
import UserForm from '~/component/UserForm';
import { registerUser } from '~/service/user';
import { useUserTreeStore } from '~/store/userTree';
import { toastMsg } from '~/type';
import { IUser } from '~/type/user';

const RegisterPage = () => {
  const { increment } = useUserTreeStore();
  const handleSubmit = async (user: Partial<IUser>): Promise<boolean> => {
    // console.log({ registerUser: user });
    return registerUser(user as IUser)
      .then((res) => {
        const { status, data } = res;
        if (status !== 200) {
          throw new Error();
        }
        toast.success(toastMsg.success);
        increment();
        return true;
      })
      .catch((error) => {
        error?.data ? toast.error(error.data) : toast.error(toastMsg.error);
        return false;
      });
  };

  return <UserForm onSubmit={handleSubmit} />;
};

export default RegisterPage;

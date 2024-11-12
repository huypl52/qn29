import { IPasswordUpdateValues } from '~/type/user';
import PasswordUpdateForm from './PasswordUpdateForm';
import { updatePassword } from '~/service/user';
import { toastMsg } from '~/type';
import { toast } from 'react-toastify';

const PasswordUpdatePage = () => {
  const handleSubmit = async (values: IPasswordUpdateValues) => {
    return updatePassword(values)
      .then((res) => {
        const { data, status } = res;
        if (status !== 200) {
          throw Error(data ? data : toastMsg.error);
        }
        toast.success(data ? data : toastMsg.success);
      })
      .catch((err) => {
        const msg = err?.data ? err.data : toastMsg.error;
        toast.error(msg);
        throw Error(msg);
      });
  };
  return <PasswordUpdateForm onSubmit={handleSubmit} />;
};

export default PasswordUpdatePage;

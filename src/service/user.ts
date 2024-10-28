import { IUserRegister } from '~/type/user';
import { httpPost } from './_req';

export const registerUser = (user: IUserRegister) => {
  return httpPost()('/users?', {
    username: user.username,
    password: user.password,
    fullname: user.fullname,
    orgid: user.orgid,
  });
};

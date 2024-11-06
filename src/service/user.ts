import { IUserRegister } from '~/type/user';
import { httpGet, httpPost } from './_req';

export const registerUser = (user: IUserRegister) => {
  return httpPost()('/users?', {
    username: user.username,
    password: user.password,
    fullname: user.fullname,
    orgid: user.orgid,
  });
};

export const getUserDetail = (id: string) => {
  return httpGet()(`/users/${id}`);
};

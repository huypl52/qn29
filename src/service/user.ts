import { IPasswordUpdateValues, IUser } from '~/type/user';
import { httpDel, httpGet, httpPatch, httpPost, httpPut } from './_req';

export const registerUser = (user: IUser) => {
  return httpPost()('/users?', user);
};

export const getUserDetail = (id: string) => {
  return httpGet()(`/users/${id}`);
};

export const getUserTree = () => {
  return httpGet()('orgs/usertree?');
};

export const putUser = (user: IUser) => {
  return httpPut()(`users/${user.id}`, user);
};

export const deleteUser = (id: string) => {
  return httpDel()(`/users/${id}?`);
};

export const restoreUser = (id: string) => {
  return httpPatch()(`/users/${id}/recovery?`);
};

export const updatePassword = (updates: IPasswordUpdateValues) => {
  return httpPatch()('/accounts/password?', updates);
};

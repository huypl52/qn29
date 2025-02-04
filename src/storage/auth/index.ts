import { ERole, IUserLogin } from '~/type/user';

const LOCAL_USER = 'LOCAL_USER';
const TOKEN = 'TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const saveUser = (user: IUserLogin) => {
  window.localStorage.setItem(LOCAL_USER, JSON.stringify(user));
};

export const clearUser = () => {
  try {
    window.localStorage.removeItem(LOCAL_USER);
  } catch (error) {
    return;
  }
};

export const getUser = (): IUserLogin | null => {
  try {
    const user = JSON.parse(
      window.localStorage.getItem(LOCAL_USER) || ''
    ) as IUserLogin;
    if (user?.token) return user;
    return null;
  } catch (error) {
    return null;
  }
};

export const getUserRole = (): ERole | null => {
  try {
    const user = JSON.parse(
      window.localStorage.getItem(LOCAL_USER) || ''
    ) as IUserLogin;
    if (user?.token) return user.role;
    return null;
  } catch (error) {
    return null;
  }
};

export const getUserToken = () => {
  const user = getUser();
  if (!user) return;
  return user.token;
};

export const getUserRefreshToken = () => {
  const user = getUser();
  if (!user) return;
  return user.refresh_token;
};

export const saveUserToken = (token: string) => {
  const user = getUser();
  if (!user) return;
  user.token = token;
  saveUser(user);
};

export const saveUserRefreshToken = (refresh_token: string) => {
  const user = getUser();
  if (!user) return;
  user.refresh_token = refresh_token;
  saveUser(user);
};

export const getUserRoleId = () => {
  const user = getUser();
  if (!user) return;
  const { role } = user;
  return role;
};

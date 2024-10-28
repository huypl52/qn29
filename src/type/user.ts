export interface IUser {
  username: string;
  password: string;
  role: string;
}

export interface IUserLogin {
  token: string;
  refreshToken: string;
  created: string;
  expiredSecond: 604800;
}

export interface IUserRegister {
  username: string;
  password: string;
  fullname: string;
  orgid: string;
}

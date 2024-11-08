export interface IUser {
  id: string;
  username: string;
  password: string;
  role: ERole;
}

export interface IUserLogin {
  token: string;
  refreshToken: string;
  created: string;
  expiredSecond: 604800;
  role: ERole;
}

export interface IUserRegister {
  username: string;
  password: string;
  fullname: string;
  orgid: string;

  // 0: user, 1: admin
  role: ERole;
}

export enum ERole {
  user = 0,
  admin = 1,
}

import { PropsWithChildren } from "react";

interface IRouteWrapper extends PropsWithChildren {
  allowedRoles: string[];
}

interface IUser {
  username: string;
  password: string;
  role: string;
}

interface IAutContext {
  user: IUser | null;
  login: (u: string, p: string) => Promise<boolean>;
  logout: () => void;
}

export { type IAutContext as IAuthContext, type IRouteWrapper, type IUser };

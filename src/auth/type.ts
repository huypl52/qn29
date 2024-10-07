import { PropsWithChildren } from "react";
import { IUser } from "~/type/user";

interface IRouteWrapper extends PropsWithChildren {
  allowedRoles: string[];
}

interface IAutContext {
  user: IUser | null;
  login: (u: string, p: string) => Promise<boolean>;
  logout: () => void;
}

export { type IAutContext as IAuthContext, type IRouteWrapper };

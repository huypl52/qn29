import { PropsWithChildren } from 'react';
import { IUser } from '~/type/user';

interface IRouteWrapper extends PropsWithChildren {
  allowedRoles: string[];
}

interface IAuthContext {
  user: IUser | null;
  login: (u: string, p: string) => Promise<boolean>;
  logout: () => void;
}

export { type IAuthContext, type IRouteWrapper };

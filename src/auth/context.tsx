import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { IAuthContext } from './type';
import { toast } from 'react-toastify';
import { toastMsg } from '~/type';
import { loginUser } from '~/service/auth';
import { IUser, IUserLogin } from '~/type/user';
import { saveUser } from '~/storage/auth';

// Auth Context
const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => Promise.resolve(true),
  logout: () => console.log(1),
});

// Mock user data - in real app, this would come from your backend
// const MOCK_USERS = [
//   { username: "admin", password: "admin123", role: "admin" },
//   { username: "user", password: "user123", role: "user" },
// ];
// Auth Provider Component

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<(IUser & IUserLogin) | null>(null);

  const login = async (username: string, password: string) => {
    const loginPromise = loginUser(username, password)
      .then((res) => {
        const { data: foundUser, status } = res;
        if (status !== 200) {
          return Promise.reject('Login failed!');
        }
        saveUser(foundUser);
        setUser({ ...foundUser, username, password });
        return true;
      })
      .catch((err) => {
        const msg = err?.data ? err.data : toastMsg.error;
        // toast.error(err?.data ? err.data : toastMsg.error);
        return Promise.reject(msg);
      });

    return toast.promise(
      Promise.all([
        loginPromise,
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(true);
          }, 2000)
        ),
      ]).then((res) => {
        return res[0];
      }),
      {
        pending: 'Đang đăng nhập...',
        success: toastMsg.success,
        error: {
          render: (err) => {
            return <>{err?.data ? err.data : toastMsg.error}</>;
          },
        },
      }
    );
  };

  const logout = () => {
    toast.success(toastMsg.success);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for using Auth Context
const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { useAuth };

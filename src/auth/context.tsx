import { createContext, PropsWithChildren, useContext, useState } from "react";
import { IAuthContext, IUser } from "./type";
import { toast } from "react-toastify";
import { toastMsg } from "~/type";

// Auth Context
const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => Promise.resolve(true),
  logout: () => console.log(1),
});

// Mock user data - in real app, this would come from your backend
const MOCK_USERS = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" },
];
// Auth Provider Component
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (username: string, password: string) => {
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password,
    );
    if (foundUser) {
      setUser(foundUser);
      toast.success(toastMsg.success);

      return true;
    }
    toast.error(toastMsg.error);
    return false;
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

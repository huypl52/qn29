import { IUserLogin } from "~/type/user";
import { httpPost } from "./_req";

export const loginUser = (username: string, password: string) => {
  return httpPost()<IUserLogin>("/accounts/login?", {
    username,
    password,
  });
};

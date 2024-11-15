import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IUser } from '~/type/user';

interface IUserState {
  users: IUser[];
  addUsers: (users: IUser[]) => void;
  putUser: (user: IUser) => void;
  insertUser: (user: IUser) => void;
  deleteUser: (id: string) => void;

  selectNode: (id?: string) => void;
  selectedNodeId?: string;
  counter: number;
  increment: () => void;
}

export const useUserTreeStore = create<IUserState>()(
  immer((set) => ({
    counter: 0,
    selectedNodeId: undefined,
    users: [],
    addUsers: (users: IUser[]) =>
      set((state: IUserState) => {
        state.users = [...users];
      }),
    putUser: (user: IUser) =>
      set((state: IUserState) => {
        const idx = state.users.findIndex((o) => o.id === user.id);
        if (idx !== -1) {
          state.users[idx] = user;
        }
      }),
    insertUser: (user: IUser) =>
      set((state: IUserState) => {
        state.users.unshift(user);
      }),
    deleteUser: (id: string) => {
      set((state: IUserState) => [
        (state.users = state.users.filter((user) => user.id !== id)),
      ]);
    },
    selectNode: (id?: string) =>
      set((state: IUserState) => {
        state.selectedNodeId = id;
      }),
    increment: () =>
      set((state: IUserState) => {
        if (state.counter > 9999) {
          state.counter = 0;
        }
        state.counter = state.counter + 1;
      }),
  }))
);

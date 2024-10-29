import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IOrg } from '~/type/org';

interface IOrgState {
  orgs: IOrg[];
  addOrgs: (orgs: IOrg[]) => void;
  putOrg: (org: IOrg) => void;
  insertOrg: (org: IOrg) => void;
  deleteOrg: (id: string) => void;
}

export const useOrgStore = create<IOrgState>()(
  immer((set) => ({
    orgs: [],
    addOrgs: (orgs: IOrg[]) =>
      set((state: IOrgState) => {
        state.orgs = [...orgs];
      }),
    putOrg: (org: IOrg) =>
      set((state: IOrgState) => {
        const idx = state.orgs.findIndex((o) => o.id === org.id);
        if (idx !== -1) {
          state.orgs[idx] = org;
        }
      }),
    insertOrg: (org: IOrg) =>
      set((state: IOrgState) => {
        state.orgs.unshift(org);
      }),
    deleteOrg: (id: string) => {
      set((state: IOrgState) => [state.orgs.filter((org) => org.id !== id)]);
    },
  }))
);

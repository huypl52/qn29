import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ITaskDetail } from '~/type/task';

interface ITaskOcrState {
  ocrTasks: ITaskDetail[];
  addOcrTasks: (tasks: ITaskDetail[]) => void;
  selectedOcrIds: string[];
  addSelectedOcrIds: (ids: string[]) => void;
  recentAdded: boolean;
  updateRecentAdded: (v: boolean) => void;
}

export const useOcrTaskStore = create<ITaskOcrState>()(
  immer((set) => ({
    ocrTasks: [],
    selectedOcrIds: [],
    recentAdded: false,
    updateRecentAdded: (v: boolean) =>
      set((state: ITaskOcrState) => {
        state.recentAdded = v;
      }),
    addSelectedOcrIds: (ids: string[]) =>
      set((state: ITaskOcrState) => {
        state.selectedOcrIds = ids;
        state.recentAdded = true;
      }),
    addOcrTasks: (tasks: ITaskDetail[]) =>
      set((state: ITaskOcrState) => {
        state.ocrTasks = [...tasks, ...state.ocrTasks];
      }),
  }))
);

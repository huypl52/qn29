import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ITaskDetail } from '~/type/task';

interface ITaskState {
  tasks: ITaskDetail[];
  selectedTaskId?: string;
  selectTaskId: (taskId: string) => void;
  addTask: (task: ITaskDetail) => void;
  putTasks: (tasks: ITaskDetail[]) => void;
  insertTasks: (tasks: ITaskDetail[]) => void;
}

export const useTaskStore = create<ITaskState>()(
  immer((set) => ({
    tasks: [],
    selectedTaskId: undefined,
    selectTaskId: (taskId?: string) =>
      set((state: ITaskState) => {
        state.selectedTaskId = taskId;
      }),
    addTask: (task: ITaskDetail) =>
      set((state: ITaskState) => {
        state.tasks = [...state.tasks, task];
      }),
    putTasks: (tasks: ITaskDetail[]) =>
      set((state: ITaskState) => {
        state.tasks = tasks;
      }),
    insertTasks: (tasks: ITaskDetail[]) =>
      set((state: ITaskState) => {
        state.tasks = [...tasks, ...state.tasks];
      }),
  }))
);

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ETaskType, ITaskDetail } from '~/type/task';

interface ITaskState {
  type: ETaskType;
  changeTaskType: (t: ETaskType) => void;
  taskDetails: ITaskDetail[];
  selectedTaskId?: string;
  selectTaskId: (taskId: string) => void;
  addTaskDetail: (task: ITaskDetail) => void;
  putTaskDetails: (tasks: ITaskDetail[]) => void;
  insertTaskDetails: (tasks: ITaskDetail[]) => void;
}

export const useTaskStore = create<ITaskState>()(
  immer((set) => ({
    type: ETaskType.TRANSLATE,
    changeTaskType: (t: ETaskType) => {
      set((state: ITaskState) => {
        state.type = t;
      });
    },
    taskDetails: [],
    selectedTaskId: undefined,
    selectTaskId: (taskId?: string) =>
      set((state: ITaskState) => {
        state.selectedTaskId = taskId;
      }),
    addTaskDetail: (task: ITaskDetail) =>
      set((state: ITaskState) => {
        state.taskDetails = [...state.taskDetails, task];
      }),
    putTaskDetails: (tasks: ITaskDetail[]) =>
      set((state: ITaskState) => {
        state.taskDetails = tasks;
      }),
    insertTaskDetails: (tasks: ITaskDetail[]) =>
      set((state: ITaskState) => {
        state.taskDetails = [...tasks, ...state.taskDetails];
      }),
  }))
);

import { httpGet } from './_req';
import { ITaskDetail, ITaskHistory } from '~/type/task';

export const getTaskDetails = (taskId: string) => {
  return httpGet()<ITaskDetail[]>(`/tasks/${taskId}`);
};

export const getImage = (fileId: string) => {
  return httpGet()<ArrayBufferLike>(`/tasks/file/image?=&id=${fileId}`, {
    responseType: 'arraybuffer',
  });
};

export const getTaskHistory = (skip = 0, take = 20) => {
  return httpGet()<ITaskHistory[]>(`/tasks/history?skip=${skip}&take=${take}`);
};

import { httpGet } from './_req';
import { ITaskDetail } from '~/type/task';

export const getTaskDetails = (taskId: string) => {
  return httpGet()<ITaskDetail[]>(`/tasks/${taskId}`);
};

export const getImage = (fileId: string) => {
  return httpGet()<ArrayBufferLike>(`/tasks/file/image?=&id=${fileId}`, {
    responseType: 'arraybuffer',
  });
};

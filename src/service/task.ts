import { httpGet } from './_req';
import {
  ETaskType,
  ITaskDetail,
  ITaskHistory,
  LTaskTypeOcr,
  StatisticalParam,
} from '~/type/task';

export const getTaskDetails = (taskId: string) => {
  return httpGet()<ITaskDetail[]>(`/tasks/${taskId}`);
};

export const getImage = (fileId: string) => {
  return httpGet()<ArrayBufferLike>(`/tasks/file/image?=&id=${fileId}`, {
    responseType: 'arraybuffer',
  });
};
// a đang để type filter client chỉ có 2 loạn đơn giản là ocr và dịch thôi
// type=1 là ocr sẽ lấy ra 3 giá trị type 1, 5, 6
// filter=2 thì lấy về 2 3 4 6
// ocr = 1
// translate = 2
// manualTranslate = 3
// ocrTranslate = 4
// manualOCR = 5
// manualOCRTranslate = 6

export const getTaskHistory = (skip = 0, take = 20, type?: ETaskType) => {
  let taskGroupType = 2;
  if (LTaskTypeOcr.includes(type)) {
    taskGroupType = 1;
  }

  return httpGet()<ITaskHistory[]>(
    `/tasks/history?skip=${skip}&take=${take}&type=${taskGroupType}`
  );
};

// TODO: need task type
export const getTotalTaskHistory = () => {
  return httpGet()<{ total: number }>('/tasks/history/summary?');
};

//Statistical

export const getStatisticalOcrHistory = ({
  group = 0,
  from_date,
  to_date,
}: StatisticalParam) => {
  const queryParams = new URLSearchParams({
    group: group.toString(),
    ...(from_date && { from_date }), // Chỉ thêm từ khóa từ nếu từ ngày đã được cung cấp
    ...(to_date && { to_date }), // Chỉ thêm từ khóa đến nếu đến ngày đã được cung cấp
  }).toString();
  return httpGet()(`/reports/ocr/imagecount/group?${queryParams}`);
};

export const getStatisticalTranslateHistory = ({
  group = 0,
  from_date,
  to_date,
}: StatisticalParam) => {
  const queryParams = new URLSearchParams({
    group: group.toString(),
    ...(from_date && { from_date }), // Chỉ thêm từ khóa từ nếu từ ngày đã được cung cấp
    ...(to_date && { to_date }), // Chỉ thêm từ khóa đến nếu đến ngày đã được cung cấp
  }).toString();

  return httpGet()<object[]>(
    `/reports/translate/manualcount/group?${queryParams}`
  );
};

import { httpGet } from './_req';
import {
  ETaskType,
  IStatisticalParam,
  ITaskDetail,
  ITaskHistory,
  listTaskTypeOcr,
} from '~/type/task';

export const getTaskDetails = (taskId: string) => {
  return httpGet()<ITaskDetail[]>(`/tasks/${taskId}`);
};

export const getImage = (fileId: string) => {
  return httpGet()<ArrayBufferLike>(`/tasks/file/image?=&id=${fileId}`, {
    responseType: 'blob',
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
  if (listTaskTypeOcr.includes(type)) {
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
// 6 api thống kê a bổ sung 2 tham số: userid và seft=1 như sau
// - seft=1: Dùng cho tình huống lấy dữ liệu theo tài khoản đăng nhập. Thì tài khoản nào cũng có quyền gọi api này
// - Tham số userid để lọc theo muốn xem người dùng nào. Có truyền thì lọc, không truyền thì sẽ lấy all user
// - nếu không truyền seft=1 thì sẽ kiểm tra phải là tài khoản có quyền mới gọi được.
export const getStatisticalOcrHistory = (params: IStatisticalParam) => {
  return httpGet()(`/reports/ocr/imagecount/group?`, { params });
};

export const getStatisticalTranslateHistory = (params: IStatisticalParam) => {
  return httpGet()<object[]>(`/reports/translate/manualcount/group?`, {
    params,
  });
};

export const getStatisticalOcrHistoryTranslate = (
  params: IStatisticalParam
) => {
  return httpGet()(`/reports/ocr/translatecount/group?`, { params });
};

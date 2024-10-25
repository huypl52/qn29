import { ETaskType } from './task';
import { DLang } from './vocab';

export interface IOcrResult {
  ocred_text: string;
  detected_language: DLang;
  status: number;
  message: string;
}

export interface ITranslateOcr {
  //   status: Trạng thái
  // 1 là thành công
  // 0 là thất bại, khi thất bại sẽ kèm thông tin trường error
  // dest_text: Kết quả dịch nếu thành công (status = 1)
  // error: Nội dung lỗi đi kèm nếu dịch thất bại (status = 0)
  status: number;
  created_time: string;
  taskid: string;
  ocrid: string;
}

export interface IOcrTranslateResult {
  ocred_text: string;
  detected_language: DLang;
  dest_language: DLang;
  translation: string;
  status: number;
  message: string;
}

export interface IOcrResponse {
  type: ETaskType.OCR;
  id: string;
  name: string;
  size: number;
  refid: string;
  created_time: string;
  ocr_id: string;
}

export enum EProcessStatus {
  pending = 1,
  success = 2,
  failed = 3,
}

export interface IOcrDetail {
  id: string;
  status: EProcessStatus;
  created_userid: string;
  created_time: string;
  detected_language: DLang;
  detected_time: string;
  detected_text: string;
}

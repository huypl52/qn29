import { EProcessStatus } from './ocr';
import { DLang } from './vocab';

export enum ETaskType {
  OCR = 1,
  TRANSLATE = 2,
  MANUAL_TRANSLATE = 3,
  OCR_TRANSLATE = 4,
  MANUAL_OCR = 5,
  MANUAL_OCR_TRANSLATE = 6,
}

export const listTaskTypeOcr = [ETaskType.OCR, ETaskType.OCR_TRANSLATE];
export const listTaskTypeTranslate = [
  ETaskType.TRANSLATE,
  ETaskType.MANUAL_TRANSLATE,
];

export interface ITaskHistory {
  // Task history
  id: string;
  created_time: string;
  type?: ETaskType;
  type_name: string;
  details: ITaskHistoryDetail[];
}

export interface ITaskHistoryDetail {
  status: EProcessStatus;
  detected_language: DLang;
  detected_text: string;

  // OCR
  fileid: string;
  file_name: string;
  dest_language: DLang;
  dest_text: string;
}

export interface ITaskDetail {
  id: string;
  created_time: string;
  type?: ETaskType;
  source_language: DLang;
  source_text: string;

  // with OCR result
  ocr_status: EProcessStatus;
  ocrid?: string;
  detected_language?: DLang;
  detected_text?: string;

  // if translated
  translation_status: EProcessStatus;
  dest_text?: string;
  dest_language?: DLang;
  translation_id?: string;

  // FE insert image by uploading
  file_name?: string;
  fileid?: string;
}

export interface StatisticalParam {
  group?: number; // Tham số group có thể là số
  from_date?: string; // Tham số ngày bắt đầu (định dạng YYYY-MM-DD)
  to_date?: string; // Tham số ngày kết thúc (định dạng YYYY-MM-DD)
}

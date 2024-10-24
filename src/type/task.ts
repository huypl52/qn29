import { EProcessStatus } from './ocr';
import { DLang } from './vocab';

export enum ETaskType {
  OCR = 1,
  TRANSLATE = 2,
  OCR_TRANSLATE = 4,
}

export interface ITaskHistory {
  // Task history
  id: string;
  created_time: string;
  type?: ETaskType;
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
  ocrid?: string;
  detected_language?: DLang;
  detected_text?: string;

  // if translated
  dest_text?: string;
  dest_language?: DLang;
  translation_id?: string;

  // FE insert image by uploading
  fileid?: string;
}

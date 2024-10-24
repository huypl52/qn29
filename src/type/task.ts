import { DLang } from './vocab';

export enum ETaskType {
  OCR = 1,
  TRANSLATE = 2,
  ORC_TRANSLATE = 4,
}

export enum ETaskStatus {
  PENDING = 1,
  SUCCESS = 2,
  ERROR = 3,
}

export interface ITaskHistory {
  // Task history
  id: string;
  created_time: string;
  type?: ETaskType;
  details: ITaskHIstoryDetail[];
}

export interface ITaskHIstoryDetail {
  status: ETaskStatus;
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

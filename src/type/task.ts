import { DLang } from './vocab';

export enum ETaskType {
  OCR = 1,
  TRANSLATE = 2,
}

export interface ITaskHistory {
  // Task history
  id: string;
  created_time: string;
  type?: ETaskType;
}

export interface ITaskDetail extends ITaskHistory {
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

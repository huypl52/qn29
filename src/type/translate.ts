import { EProcessStatus } from './ocr';
import { DLang } from './vocab';

export interface ITranslation {
  source_language: DLang;
  source_text: string;
  dest_language: DLang;
  dest_text: string;
  // taskid: string;
  // ocrid: string;
}

export interface ITranslationResult {
  translation: string;
  status: number;
  created_time: Date;
  dest_language: DLang;
  // taskid: string;
  // ocrid: string;
}

export interface ISavedTranslation {
  dest_text: string;
  status: EProcessStatus;
  created_time: string;
  taskid: string;
}

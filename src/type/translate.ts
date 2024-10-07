import { DLang } from "./vocab";

export interface ITranslation {
  source_language: DLang;
  source_text: string;
  dest_language: DLang;
  taskid: string;
  ocrid: string;
}

export interface ITranslationResult {
  dest_text: string;
  status: number;
  created_time: Date;
  taskid: string;
  ocrid: string;
}

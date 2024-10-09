import { DLang } from "./vocab";

export interface IOcrResult {
  ocred_text: string;
  detected_language: DLang;
  status: number;
  message: string;
}

export interface IOcrTranslateResult {
  ocred_text: string;
  detected_language: DLang;
  dest_language: DLang;
  translation: string;
  status: number;
  message: string;
}

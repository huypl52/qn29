import { DLang } from './vocab';

export interface IStatOcr {
  ocr_uploaded: 305;
  ocr_converted: 302;
  ocr_converting: 1;
  ocr_failed: 2;
}

export interface IStatOcrTranslate {
  ocr_detected: 41;
  ocr_translated: 28;
  ocr_untranslated: 0;
}

export type IStatTranslateManual = {
  source_language: DLang;
  count: 5;
}[];

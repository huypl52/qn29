import { DLang } from './vocab';

export interface IStatOcr {
  ocr_uploaded: 305;
  ocr_converted: 302;
  ocr_converting: 1;
  ocr_failed: 2;

  ocr_translated: 0;
  ocr_translating: 0;
  ocr_translate_error: 0;
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

// from_date: từ ngày, sử dụng định dạng yyyy-MM-dd
// to_date: đến ngày, sử dụng định dạng yyyy-MM-dd
// period: kỳ tính cho thời gian: 1 tuần này, 2 tháng này, 3 năm nay. Chỉ truyền 1 mình period không kèm from_date, to_date thì mới tính toán ra from_date, to_date theo ngày hiện tại của API
export interface IStatParam {
  from_date?: string | Date;
  to_date?: string | Date;
  period?: number;
  userid?: string;
  self?: number;
}

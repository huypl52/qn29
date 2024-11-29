import { DLang } from '~/type';
import { ITranslateOcr } from '~/type/ocr';
import {
  ISavedTranslation,
  ITranslation,
  ITranslationResult,
} from '~/type/translate';
import { httpPost } from './_req';

const defaultTranslateConf: ITranslation = {
  source_language: DLang.zh,
  source_text: '',
  dest_language: DLang.vi,
  dest_text: '',
};

export const translate = ({ source_text }: ITranslation) => {
  return httpPost(0)<ITranslationResult>('/proxy/translate?', {
    ...defaultTranslateConf,
    source_text,
  });
};

export const saveTranslation = (data: ITranslation) => {
  return httpPost(0)<ISavedTranslation>('/translations/manual/history?', data);
};

export const translateOcr = (ocrIds: string[], lang: DLang = DLang.vi) => {
  return httpPost(0)<ITranslateOcr[]>('/translations/ocrs?', {
    dest_language: lang,
    ocrids: ocrIds,
  });
};

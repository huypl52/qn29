import {
  ISavedTranslation,
  ITranslation,
  ITranslationResult,
} from '~/type/translate';
import { httpPost } from './_req';
import { DLang } from '~/type';

const defaultTranslateConf: ITranslation = {
  source_language: DLang.zh,
  source_text: '',
  dest_language: DLang.vi,
  dest_text: '',
};

export const translate = ({ source_text }: ITranslation) => {
  return httpPost(1)<ITranslationResult>('/translate', {
    ...defaultTranslateConf,
    source_text,
  });
};

export const saveTranslation = (data: ITranslation) => {
  return httpPost(0)<ISavedTranslation>('/translations/manual/history?', data);
};

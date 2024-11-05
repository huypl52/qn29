import { ISearchParam, ISearchResult } from '~/type/report';
import { httpGet, httpPut } from './_req';
import {
  IStatOcr,
  IStatOcrTranslate,
  IStatParam,
  IStatTranslateManual,
} from '~/type/statistic';

export const searchContent = (param: ISearchParam) => {
  return httpGet()<ISearchResult[]>('/reports/search/content?', {
    params: param,
  });
};

export const getStatOcr = (param: IStatParam) => {
  return httpGet()<IStatOcr>('reports/ocr/imagecount?', {
    params: param,
  });
};

export const getStatOcrTranslate = (param: IStatParam) => {
  return httpGet()<IStatOcrTranslate>('/reports/ocr/translatecount?', {
    params: param,
  });
};

export const getStatTranslateManual = (param: IStatParam) => {
  return httpGet()<IStatTranslateManual>('/reports/translate/manualcount?', {
    params: param,
  });
};

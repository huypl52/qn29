import { ISearchParam, ISearchResult } from '~/type/report';
import { httpGet, httpPut } from './_req';

export const searchContent = (param: ISearchParam) => {
  return httpGet()<ISearchResult[]>('/reports/search/content?', {
    params: param,
  });
};

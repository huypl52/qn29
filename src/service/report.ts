import { ISearchParam, ISearchResult } from '~/type/report';
import {
  IStatOcr,
  IStatOcrTranslate,
  IStatParam,
  IStatTranslateManual,
} from '~/type/statistic';
import { httpGet } from './_req';

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

export const exportReport = async (from_date?: string, to_date?: string) => {
  return httpGet()('/reports/export?', {
    responseType: 'blob',
    headers: {
      Accept: 'application/octet-stream',
    },
    params: { from_date, to_date },
  }).then((response) => {
    // Extract filename from Content-Disposition header
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'bao-cao.xlsx'; // Default filename

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename\*=UTF-8''(.+)$/);
      if (filenameMatch) {
        filename = decodeURIComponent(filenameMatch[1]);
      } else {
        const defaultMatch = contentDisposition.match(/filename=(.+?)(;|$)/);
        if (defaultMatch) {
          filename = defaultMatch[1].replace(/["']/g, '');
        }
      }
    }

    // Create blob URL
    const blob = new Blob([response.data], {
      type: response.headers['content-type'] || 'application/octet-stream',
    });
    const downloadUrl = window.URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  });
};

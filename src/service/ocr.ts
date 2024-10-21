import { httpGet, httpPost, httpPostForm } from './_req';
import { DLang } from '~/type';
import {
  IOcrDetail,
  IOcrResponse,
  IOcrResult,
  IOcrTranslateResult,
} from '~/type/ocr';

export const getOcr = ({ files }: { lang: DLang; files: File[] }) => {
  return httpPostForm(1)<IOcrResult>(`/ocr_image`, {
    file: files[0],
  });
};

export const getOcrTranslate = ({
  lang,
  files,
}: {
  lang: DLang;
  files: File[];
}) => {
  return httpPostForm()<IOcrTranslateResult>(`/files?dest_language=${lang}`, {
    file: files[0],
  });
};

export const uploadOcrFiles = (
  ocr = true,
  files: File[],
  translation: DLang | undefined = undefined
) => {
  const param: { [k: string]: string | boolean } = { ocr: ocr };
  if (translation) {
    param['translate'] = translation;
  }

  const form = new FormData();
  files.forEach((f) => {
    form.append('file', f);
  });
  return httpPost(0)<IOcrResponse[]>(
    `/tasks/files`,
    // Object.fromEntries(files.map((f) => ['file', f])),
    form,
    { params: param }
  );
};

export const getOcrDetail = (ocrId: string) => {
  return httpGet()<IOcrDetail>(`/ocrs/${ocrId}`);
};

import { httpPostForm } from "./_req";
import { DLang } from "~/type";
import { IOcrResult, IOcrTranslateResult } from "~/type/ocr";

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
  return httpPostForm(1)<IOcrTranslateResult>(
    `/ocr_translate?dest_language=${lang}`,
    {
      file: files[0],
    },
  );
};

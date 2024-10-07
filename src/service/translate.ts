import { ITranslation, ITranslationResult } from "~/type/translate";
import { httpPost } from "./_req";
import { DLang } from "~/type";

const defaultTranslateConf: ITranslation = {
  source_language: DLang.cn,
  source_text: "",
  dest_language: DLang.vi,
  taskid: "1feb2987-47bf-46b2-9b2a-1d5b6b9a0615",
  ocrid: "dc22ebc1-24df-4a76-ab07-a41903c57a46",
};
export const translate = ({ source_text }: ITranslation) => {
  return httpPost<ITranslationResult>("/translations?", {
    ...defaultTranslateConf,
    source_text,
  });
};

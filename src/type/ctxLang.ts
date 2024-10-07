import { DLang } from "./vocab";

export interface ILangContext {
  sourceLang: DLang;
  targetLang: DLang;

  setSourceLang: (lang: DLang) => void;
  setTargetLang: (lang: DLang) => void;
}

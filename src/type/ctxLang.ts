import { DLang } from "./vocab";

export interface ILangContext {
  sourceLang: DLang;
  targetLang: DLang;

  updateSourceLang: (lang: DLang) => void;
  updateTargetLang: (lang: DLang) => void;
}

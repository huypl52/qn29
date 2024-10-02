interface ITranslator {}

interface ITranslatorContext {
  srcText?: string;
  targetText?: string;
  srcLang: string;
  targetLang: string;
  updateSrcText: (s: string) => void;
  updateTargetText: (s: string) => void;
  updateSrcLang: (s: string) => void;
  updateTargetLang: (s: string) => void;
  maxInputLeng: number;
}

export { type ITranslator, type ITranslatorContext };

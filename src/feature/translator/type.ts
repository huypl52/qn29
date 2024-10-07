interface ITranslator {}
export enum EStatus {
  idle,
  waiting,
  sending,
}

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
  status: EStatus;
  setStatus: (s: EStatus) => void;
}

export { type ITranslator, type ITranslatorContext };

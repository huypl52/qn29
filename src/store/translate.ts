import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { EStatus } from '~/feature/translator/type';

interface ITranslateState {
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

export const useTranslateStore = create<ITranslateState>()(
  immer((set) => ({
    srcText: '',
    targetText: '',
    srcLang: '',
    targetLang: '',
    maxInputLeng: 5000,
    status: EStatus.idle,

    updateSrcText: (s: string) =>
      set((state: ITranslateState) => {
        state.srcText = s;
      }),
    updateTargetText: (s: string) =>
      set((state: ITranslateState) => {
        state.targetText = s;
      }),
    updateSrcLang: (s: string) =>
      set((state: ITranslateState) => {
        state.srcLang = s;
      }),
    updateTargetLang: (s: string) =>
      set((state: ITranslateState) => {
        state.targetLang = s;
      }),
    setStatus: (s: EStatus) =>
      set((state: ITranslateState) => {
        state.status = s;
      }),
  }))
);

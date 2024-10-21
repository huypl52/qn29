interface IOcrContext {
  clearInput: () => void;
  translations: string[];
  updateTranslations: (translations: string[]) => void;
  isEmpty: boolean;
  // updateFiles: (files: File[]) => void;
  needTranslate?: boolean;
  toggleNeedTranslate: () => void;
}

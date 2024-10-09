interface IOcrContext {
  clearInput: () => void;
  translations: string[];
  updateTranslations: (translations: string[]) => void;
  isEmpty: boolean;
}

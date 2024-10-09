import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const OcrContext = createContext<IOcrContext>({
  clearInput: () => {},
  translations: [],
  updateTranslations: () => {},
  isEmpty: true,
});

const OcrContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [translations, setTranslations] = useState<string[]>([]);

  const clearInput = useCallback(() => {
    // setFiles([]);
    setTranslations([]);
  }, []);

  const isEmpty = useMemo(() => translations.length === 0, [translations]);

  return (
    <OcrContext.Provider
      value={{
        // files: files,
        // updateFiles: setFiles,
        clearInput,
        translations,
        updateTranslations: setTranslations,
        isEmpty,
      }}
    >
      {children}
    </OcrContext.Provider>
  );
};

const useOcrContext = () => useContext(OcrContext);

export { OcrContextProvider, useOcrContext };

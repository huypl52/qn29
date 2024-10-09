import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDragDropContext } from "~/component/Drag&Drop/context";
import { getOcr } from "~/service/ocr";
import { useLangContext } from "../languageSelect/context";
import { toast } from "react-toastify";
import { toastMsg } from "~/type";

const OcrContext = createContext<IOcrContext>({
  clearInput: () => {},
  translations: [],
  updateTranslations: () => {},
  isEmpty: true,
});

const OcrContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { files, updateFiles } = useDragDropContext();
  const { sourceLang } = useLangContext();
  const [translations, setTranslations] = useState<string[]>([]);

  const clearInput = useCallback(() => {
    setTranslations([]);
    updateFiles([]);
  }, [updateFiles, setTranslations]);

  useEffect(() => {
    (async () => {
      // if (!files.length) {
      //   clearInput();
      //   return;
      // }
      const { data } = await toast.promise(
        getOcr({ lang: sourceLang, files }),
        {
          pending: "Đang thực hiện...",
          success: toastMsg.success,
          // error: {
          //   render: (err) => {
          //     return <>{err?.data ? err.data : toastMsg.error}</>;
          //   },
          // },
        },
      );
      console.log({ data });
      if (data?.ocred_text) {
        setTranslations([data.ocred_text]);
      }
    })();
  }, [files]);

  const isEmpty = useMemo(
    () => translations.length === 0 && files.length === 0,
    [translations],
  );

  return (
    <OcrContext.Provider
      value={{
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

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDragDropContext } from '~/component/Drag&Drop/context';
import { uploadOcrFiles } from '~/service/ocr';
import { toast } from 'react-toastify';
import { DLang, toastMsg } from '~/type';
import { useTaskStore } from '~/store/task';
import { ETaskType } from '~/type/task';
import { useOcrTaskStore } from '~/store/taskOcr';
import { getTaskDetails } from '~/service/task';

const OcrContext = createContext<IOcrContext>({
  clearInput: () => {},
  translations: [],
  updateTranslations: () => {},
  isEmpty: true,
  needTranslate: false,
  toggleNeedTranslate: () => {},
});

const OcrContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { files: dragFiles, updateFiles } = useDragDropContext();
  const [translations, setTranslations] = useState<string[]>([]);
  const { changeTaskType, type } = useTaskStore();

  const [isEmpty, setEmpty] = useState(true);

  const toggleNeedTranslate = useCallback(() => {
    // console.log({ toggleNeedTranslate: type });
    if (type === ETaskType.OCR_TRANSLATE) {
      changeTaskType(ETaskType.OCR);
    } else if (type === ETaskType.OCR) {
      changeTaskType(ETaskType.OCR_TRANSLATE);
    }
  }, [type]);

  const needTranslate = useMemo(() => {
    // console.log({ needTranslate: type });
    return type === ETaskType.OCR_TRANSLATE;
  }, [type]);

  const { putTaskDetails, selectTaskId } = useTaskStore();
  const { updateRecentAdded } = useOcrTaskStore();

  const clearInput = useCallback(() => {
    setTranslations([]);
    updateFiles([]);
  }, [updateFiles, setTranslations]);

  const handleUploadFiles = useCallback(
    async (ocrFiles: File[]) => {
      let targetLang = undefined;
      if (needTranslate) {
        targetLang = DLang.vi;
      }
      console.log({ ocrFiles, targetLang });
      const ocrResponses = await uploadOcrFiles(true, ocrFiles, targetLang)
        .then((res) => {
          const { status, data } = res;
          if (status === 200) {
            return data;
          }
        })
        .catch((err) => {
          toast.error(err?.data ? err.data : toastMsg.error);
        });
      if (!ocrResponses) {
        return;
      }
      const taskId = ocrResponses[0].refid;
      if (!taskId) {
        console.log('No task id found');
        return;
      }

      selectTaskId(taskId);

      getTaskDetails(taskId).then((res) => {
        const { status, data } = res;
        if (status !== 200) return;
        putTaskDetails(data);
      });

      return true;
    },
    [needTranslate]
  );

  useEffect(() => {
    (async () => {
      console.log({ dragFiles });
      updateRecentAdded(true);
      if (!dragFiles.length) {
        setTranslations([]);
        setEmpty(true);
        return;
      }
      toast.promise(
        // getOcr({ lang: sourceLang, files: dragFiles }),
        handleUploadFiles(dragFiles).then((res) => {
          if (!res) throw new Error('No ocr found');
          setEmpty(false);
        }),
        {
          pending: 'Đang thực hiện...',
          success: toastMsg.success,
          error: toastMsg.error,
        }
      );
    })();
  }, [dragFiles]);

  return (
    <OcrContext.Provider
      value={{
        needTranslate,
        toggleNeedTranslate,
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

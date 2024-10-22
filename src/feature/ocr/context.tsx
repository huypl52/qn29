import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDragDropContext } from '~/component/Drag&Drop/context';
import { uploadOcrFiles } from '~/service/ocr';
import { toast } from 'react-toastify';
import { DLang, toastMsg } from '~/type';
import { useTaskStore } from '~/store/task';
import { ETaskType } from '~/type/task';
import { useOcrTaskStore } from '~/store/taskOcr';

const OcrContext = createContext<IOcrContext>({
  clearInput: () => {},
  translations: [],
  updateTranslations: () => {},
  isEmpty: true,
  // updateFiles: () => {},
  needTranslate: false,
  toggleNeedTranslate: () => {},
});

const OcrContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { files: dragFiles, updateFiles } = useDragDropContext();
  const [translations, setTranslations] = useState<string[]>([]);
  const [needTranslate, setNeedTranslate] = useState(false);
  const { addSelectedOcrIds } = useOcrTaskStore();
  const { selectTaskId } = useTaskStore();
  const [isEmpty, setEmpty] = useState(true);

  const toggleNeedTranslate = useCallback(() => {
    setNeedTranslate((prev) => !prev);
  }, []);

  const { selectedTaskId: selectedTask } = useTaskStore();
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
      addSelectedOcrIds(ocrResponses.map((r) => r.ocr_id));
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

  useEffect(() => {
    if (selectedTask?.type !== ETaskType.OCR) return;
  }, [selectedTask]);

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

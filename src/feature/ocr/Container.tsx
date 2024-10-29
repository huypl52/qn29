import { ColorButton } from '~/component/Button';
import { useOcrContext } from './context';
import drag2dropImg from '~/assets/drag_and_drop.png';
import DragDropArea from '~/component/Drag&Drop';
import { useDragDropContext } from '~/component/Drag&Drop/context';
import { toast } from 'react-toastify';
import React, { useCallback, useRef } from 'react';
import ListResult from './Result';
import ColorOptionButton from '~/component/Button/ColorOptionButton.tsx';
import { DLang, DLangMap } from '~/type';
import { useLangContext } from '~/feature/languageSelect/context.tsx';
import TextSwitch from '~/component/Switch';
import { MdClose } from 'react-icons/md';
import { useOcrTaskStore } from '~/store/taskOcr';
import { useTaskStore } from '~/store/task';

const Container: React.FC<{
  updateViewHistory: (status: boolean) => void;
  updateSavedText: (status: boolean) => void;
}> = ({ updateViewHistory, updateSavedText }) => {
  const { isEmpty } = useOcrContext();
  const { files, updateFiles } = useDragDropContext();
  const { needTranslate, toggleNeedTranslate } = useOcrContext();
  const { clearInput } = useOcrContext();

  const { selectedOcrIds, recentAdded } = useOcrTaskStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        if (clipboardItem.types.includes('image/png')) {
          const blob = await clipboardItem.getType('image/png');

          const file = new File([blob], 'pasted-image.png', {
            type: 'image/png',
          });
          updateFiles([file]);
        } else {
          console.log('No image found in clipboard.');
          toast.info('Vui lòng chọn dán đúng định dạng ảnh');
        }
      }
    } catch (error) {
      toast.info('Vui lòng chọn dán đúng định dạng ảnh');
    }
  };

  const uploadFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);
    console.log({ files });
    updateFiles(files);
  };

  const {
    updateSourceLang: setSourceLang,
    updateTargetLang: setTargetLang,
    sourceLang,
    targetLang,
  } = useLangContext();

  const updateSrcLang = useCallback(
    (key: DLang) => {
      setSourceLang(key);
    },
    [setSourceLang]
  );

  const updateTargetLang = useCallback(
    (key: DLang) => {
      setTargetLang(key);
    },
    [setTargetLang]
  );

  const { taskDetails, selectedTaskId } = useTaskStore();

  return (
    <div className="w-full h-full px-8">
      <div className="flex max-w-screen-xxl h-full justify-between mt-2 gap-2 mx-2 ">
        <div className="flex w-full gap-2 ml-2 ">
          <ColorButton
            active={sourceLang === DLang.zh}
            onClick={updateSrcLang.bind(null, DLang.zh)}
          >
            Ảnh tiếng Trung
          </ColorButton>
        </div>

        <div className="flex w-full gap-2 mr-2 flex-row-reverse items-end">
          <div className="flex items-center ml-4 gap-3">
            <button
              className=" hover:bg-gray-300 rounded-full w-10 h-10 mt-1 transition-colors duration-100 text-red-500 p-1 flex items-center justify-center"
              title="Clear"
              onClick={clearInput}
            >
              <MdClose size={20} />
            </button>
          </div>
          <TextSwitch
            onText="Dịch"
            offText="Dịch"
            defaultChecked={needTranslate}
            onChange={toggleNeedTranslate}
          />
          {/* <IoMdSwap size={24} /> */}
          {needTranslate && (
            <ColorButton
              active={targetLang === DLang.vi}
              onClick={updateTargetLang.bind(null, DLang.vi)}
            >
              {DLangMap[DLang.vi]}
            </ColorButton>
          )}
        </div>
      </div>
      {isEmpty && recentAdded ? (
        <DragDropArea>
          <div className="flex w-full h-[75vh] min-h-[360px] border border-gray-300 rounded-tl-xl rounded-tr-xl">
            <div className="w-full h-full flex flex-col justify-center items-center bg-white rounded-tl-xl rounded-tr-xl">
              <div className="w-full h-full flex flex-col justify-center items-center bg-white rounded-tl-xl rounded-tr-xl ">
                <img
                  src={drag2dropImg}
                  alt="drag and drop"
                  className="object-cover w-32 md:w-48 lg:w-64"
                />
                <span className="mb-4 text-xl font-semibold">
                  Hoặc chọn tệp
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple={true}
                  onChange={uploadFile}
                  className="hidden"
                />
                <ColorOptionButton
                  active
                  className="w-48 mt-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Tải tệp lên
                </ColorOptionButton>
                <ColorOptionButton
                  className="w-48 mt-1"
                  onClick={handlePasteFromClipboard}
                >
                  Dán ảnh từ clipboard
                </ColorOptionButton>
              </div>
            </div>
            <div className="h-full w-[2px]  my-auto"></div>
          </div>
        </DragDropArea>
      ) : (
        <ListResult
          ocrTaskResults={taskDetails}
          taskId={selectedTaskId || ''}
        />
      )}

      {/* <div className="flex justify-center space-x-12 mt-4"> */}
      {/*   <button */}
      {/*     className="flex flex-col items-center w-48 text-gray-700" */}
      {/*     onClick={() => updateViewHistory(true)} */}
      {/*   > */}
      {/*     <span className="w-16 h-16 text-3xl rounded-full bg-gray-200 flex items-center justify-center"> */}
      {/*       ↻ */}
      {/*     </span> */}
      {/*     <span className="text-xs mt-1">Các bản dịch đã thực hiện</span> */}
      {/*   </button> */}
      {/*   /!* <button *!/ */}
      {/*   /!*   className="flex flex-col items-center w-48 text-gray-700" *!/ */}
      {/*   /!*   onClick={() => updateSavedText(true)} *!/ */}
      {/*   /!* > *!/ */}
      {/*   /!*   <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"> *!/ */}
      {/*   /!*     ★ *!/ */}
      {/*   /!*   </span> *!/ */}
      {/*   /!*   <span className="text-xs mt-1">Đã lưu</span> *!/ */}
      {/*   /!* </button> *!/ */}
      {/* </div> */}
    </div>
  );
};

export default Container;

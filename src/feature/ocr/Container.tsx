import { ColorButton } from '~/component/Button';
import LangBar from '../languageSelect/LangBar';
import { useOcrContext } from './context';
import drag2dropImg from '~/assets/drag_and_drop.png';
import DragDropArea from '~/component/Drag&Drop';
import { useDragDropContext } from '~/component/Drag&Drop/context';
import { toast } from 'react-toastify';
import React, {useCallback, useRef} from 'react';
import Result from './Result';
import ColorOptionButton from '~/component/Button/ColorOptionButton.tsx';
import {DLang, DLangMap} from "~/type";
import {useLangContext} from "~/feature/languageSelect/context.tsx";

const Container : React.FC<{ updateViewHistory: (status: boolean) => void }> = ({ updateViewHistory }) =>{
  const { isEmpty } = useOcrContext();
  const { files, updateFiles } = useDragDropContext();

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
      <div className="w-full h-full max-w-screen-xl mx-auto">
        <div className="flex max-w-screen-xl h-full justify-evenly mt-2 gap-2 mx-auto">
          <div className="flex w-full gap-2 ml-2">
            <ColorButton
                active={sourceLang === DLang.zh}
                onClick={updateSrcLang.bind(null, DLang.zh)}
            >
              {DLangMap[DLang.zh]}
            </ColorButton>
          </div>
          <div className="flex w-full gap-2 ml-2">
            {/* <IoMdSwap size={24} /> */}
            <ColorButton
                active={targetLang === DLang.vi}
                onClick={updateTargetLang.bind(null, DLang.vi)}
            >
              {DLangMap[DLang.vi]}
            </ColorButton>
          </div>
        </div>
        {isEmpty ? (
            <DragDropArea>
              <div className="flex w-full h-[50vh] min-h-[360px] border border-gray-200 rounded-xl">
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <img
                      src={drag2dropImg}
                      alt="drag and drop"
                      className="object-cover w-32 md:w-48 lg:w-64"
                  />
                  <span className="mb-4 text-xl font-semibold">Hoặc chọn tệp</span>
                  <input
                      ref={fileInputRef}
                      type="file"
                      multiple={false}
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
                <div className="h-5/6 w-[2px] bg-gray-300 my-auto"></div>
                <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
                  {/*<span className="mb-4 text-xl font-semibold">Hoặc chọn tệp</span>*/}
                  {/*<input*/}
                  {/*    ref={fileInputRef}*/}
                  {/*    type="file"*/}
                  {/*    multiple={false}*/}
                  {/*    onChange={uploadFile}*/}
                  {/*    className="hidden"*/}
                  {/*/>*/}
                  {/*<ColorButton*/}
                  {/*    active*/}
                  {/*    className="w-48"*/}
                  {/*    onClick={() => fileInputRef.current?.click()}*/}
                  {/*>*/}
                  {/*  Tải tệp lên*/}
                  {/*</ColorButton>*/}
                  {/*<ColorButton className="w-48" onClick={handlePasteFromClipboard}>*/}
                  {/*  Dán ảnh từ clipboard*/}
                  {/*</ColorButton>*/}
                </div>
              </div>
            </DragDropArea>
        ) : (
            <Result/>
        )}

        <div className="flex justify-center space-x-12 mt-4">
          <button className="flex flex-col items-center w-48 text-gray-700"
                  onClick={() => updateViewHistory(true)}>
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              ↻
            </span>
            <span className="text-xs mt-1">Các bản dịch đã thực hiện</span>
          </button>
          <button className="flex flex-col items-center w-48 text-gray-700">
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              ★
            </span>
            <span className="text-xs mt-1">Đã lưu</span>
          </button>
        </div>
</div>
)
  ;
};

export default Container;

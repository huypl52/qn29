
import { ColorButton }                from '~/component/Button';
import { useOcrContext }              from './context';
import drag2dropImg                   from '~/assets/drag_and_drop.png';
import DragDropArea                   from '~/component/Drag&Drop';
import { useDragDropContext }         from '~/component/Drag&Drop/context';
import { toast }                      from 'react-toastify';
import React, { useCallback, useRef, useState } from 'react';
import ListResult                     from './Result';
import ColorOptionButton              from '~/component/Button/ColorOptionButton.tsx';
import { DLang, DLangMap }            from '~/type';
import { useLangContext } from '~/feature/languageSelect/context.tsx';
import TextSwitch from '~/component/Switch';
import { MdClose } from 'react-icons/md';
import { useOcrTaskStore } from '~/store/taskOcr';
import { useTaskStore } from '~/store/task';
import { getClipboardImage } from '~/utils/clipboard';
import uploadFileAudio from '~/service/audio.ts'



const Container: React.FC<{}> = () => {

  const { isEmpty } = useOcrContext();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // State lưu tệp
  const [textResult, setTextResult] = useState<string>(''); // Đảm bảo setTextResult là hàm từ useState
  const { needTranslate, toggleNeedTranslate } = useOcrContext();

  const { clearInput } = useOcrContext();
  const handleClearInput = () => {
    setUploadedFile(null);
  }

  const { selectedOcrIds, recentAdded } = useOcrTaskStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile: React.ChangeEventHandler<HTMLInputElement> =  async (e) => {
    try {
      // Lấy danh sách các tệp từ sự kiện
      const files = Array.from(e.target.files || []);
      setTextResult('Đang xử lý...');
      console.log({ files });

      // Cập nhật danh sách tệp nếu cần
      if (files && files.length > 0) {
        setUploadedFile(files[0]); // Lưu tệp vào state khi người dùng chọn
      };

      // Gọi API để upload tệp
      if (files.length > 0) {
        const response =  await uploadFileAudio(files[0]); // Giả sử bạn chỉ gửi 1 file
        console.log('API Response:', textResult);
        const data = response.data.voice_command_text;
        setTextResult(data);
        // Xử lý kết quả trả về từ API nếu cần
      }
    } catch (e: any) {
      console.error('Error uploading file:', e);
      setTextResult('Lỗi xử lý tệp!!!');
      // Xử lý lỗi nếu có
    }
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


  return (
    <div className="w-full h-full px-8">
      <div className="flex max-w-screen-xxl h-full justify-between mt-2 gap-2 mx-2 ">
        <div className="flex w-full gap-2 ml-2 ">
          <ColorButton
            active={sourceLang === DLang.zh}
            onClick={updateSrcLang.bind(null, DLang.zh)}
          >
            Tệp tin tiếng Trung
          </ColorButton>
        </div>

        <div className="flex w-full gap-2 mr-2 flex-row-reverse items-end">
          <div className="flex items-center ml-4 gap-3">
            <button
              className=" hover:bg-gray-300 rounded-full w-10 h-10 mt-1 transition-colors duration-100 text-red-500 p-1 flex items-center justify-center"
              title="Clear"
              onClick={handleClearInput}
            >
              <MdClose size={20} />
            </button>
          </div>
          {/* <TextSwitch */}
          {/*   onText="Dịch" */}
          {/*   offText="Dịch" */}
          {/*   defaultChecked={needTranslate} */}
          {/*   onChange={toggleNeedTranslate} */}
          {/* /> */}
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
      {uploadedFile === null ? (
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
                {/* <ColorOptionButton
                  className="w-48 mt-1"
                  onClick={handlePasteFromClipboard}
                >
                  Dán ảnh từ clipboard
                </ColorOptionButton> */}
              </div>
            </div>
            <div className="h-full w-[2px]  my-auto"></div>
          </div>
        </DragDropArea>
      ) : (
        <ListResult
          fileUploaded={uploadedFile}
          text = {textResult}
        />
      )
      }
    </div>
  );
};

export default Container;

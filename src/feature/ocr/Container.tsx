import { ColorButton } from '~/component/Button';
import LangBar from '../languageSelect/LangBar';
import { useOcrContext } from './context';
import drag2dropImg from '~/assets/drag_and_drop.png';
import DragDropArea from '~/component/Drag&Drop';
import { useDragDropContext } from '~/component/Drag&Drop/context';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import Result from './Result';
import ColorOptionButton from '~/component/Button/ColorOptionButton.tsx';

const Container = () => {
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full h-full max-w-screen-2xl mx-auto">
      <LangBar />
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
        <Result />
      )}
    </div>
  );
};

export default Container;

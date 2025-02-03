import { FaRegCopy } from 'react-icons/fa';

import { toast } from 'react-toastify';

import { StructureTextarea } from '~/component/Textarea';
import { useOcrContext }     from '~/feature/AudioToText/context.tsx';

import { copyToClipboard } from '~/utils/clipboard';


const TextBoxFooter = ({ text }: { text: string }) => {
  const onCopyClick = () => {
    if (!text) return;
    copyToClipboard(text)
      .then(() => {
        toast.success('Text is copied to clipboard');
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div
      className="text-gray-400 h-10 flex items-center cursor-pointer"
      onClick={onCopyClick}
    >
      <FaRegCopy />
    </div>
  );
};

interface IItemTaskStatus {
  fileUploaded: File | null;
  text: string;
}

interface IItemTask {
  fileUploaded: File | null;
  text: string;
}

const QUERY_TIMEOUT = 10000;
const FAILED_TIMEOUT = QUERY_TIMEOUT + 3000;

const Item = (props: IItemTask) => {
  const { fileUploaded, text } = props;
  const { clearInput } = useOcrContext(); // Lấy hàm clearInput từ context


  return (
    <div className="flex w-full divide-x divide-stone-400  bg-gray-100 gap-4 py-2 overflow-y-auto">
      <div className="w-1/2 min-w-32 h-1/3 min-h-16 my-auto">
        <audio
          controls
          className="object-contain w-3/4 max-h-[30vh] mx-auto"
        >
          {fileUploaded && (
            <source src={URL.createObjectURL(fileUploaded)} type={fileUploaded.type} />
          )}
          Trình duyệt của bạn không hỗ trợ phát âm thanh.
        </audio>
      </div>

      <div className="w-1/2 pl-2">
          <div>
            <StructureTextarea
              resizable={false}
              footer={() => (
                <TextBoxFooter text={text} />
              )}
              disabled
              value={text}
              className="h-[29vh]"
            />
          </div>
      </div>
    </div>
  );
};

interface IResult {
  fileUploaded: File | null;
  text: string;

}

const ListResult = (props: IResult) => {
  const { fileUploaded, text } = props;

  return (
    <div className="w-full relative border border-gray-200 p-1 divide-y divide-stone-200 rounded-lg bg-gray-100 overflow-y-auto h-[75vh]">
      <div className="w-full p-4 divide-y divide-stone-400 h-full">
        <Item fileUploaded={fileUploaded} text={text} />
      </div>
    </div>
  );
};

export default ListResult;

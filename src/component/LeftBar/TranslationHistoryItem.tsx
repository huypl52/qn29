import { useEffect, useState } from 'react';
import { StructureTextarea } from '~/component/Textarea';
import { ITaskHistoryDetail } from '~/type/task';
import { EProcessStatus } from '~/type/ocr';
import { toast } from 'react-toastify';
import { FaRegCopy } from 'react-icons/fa';
import LoadingText from '~/component/LoadingText';
import { MdSmsFailed } from 'react-icons/md';

const TextBoxFooter = ({ text }: { text: string }) => {
  const onCopyClick = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success('Text is copied to clipboard');
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

interface IItemTask {
  subTaskId?: string;
  taskDetail: ITaskHistoryDetail;
}

const TranslateHistoryItem = (props: IItemTask) => {
  const { taskDetail } = props;
  const [ocrResult, setTranslationResult] = useState<
    ITaskHistoryDetail | undefined
  >(taskDetail);

  useEffect(() => {
    setTranslationResult(taskDetail);
  }, [taskDetail]);

  return (
    <div className="flex w-full divide-x divide-stone-400 gap-4 py-2">
      {taskDetail.status === EProcessStatus.pending ? (
        <LoadingText />
      ) : taskDetail.status === EProcessStatus.failed ? (
        <div className="w-1/2 h-auto flex flex-col justify-center items-center text-red-800">
          <div className="border border-red-600 rounded-full p-3 ">
            <MdSmsFailed size={40} />
          </div>
          <span>Thất bại</span>
        </div>
      ) : (
        <div className="w-full pl-2">
          <div>
            <StructureTextarea
              resizable={false}
              footer={() => (
                <TextBoxFooter text={ocrResult?.source_text || ''} />
              )}
              disabled
              value={ocrResult?.source_text}
            />
          </div>
          <div className="border-t mt-2">
            <StructureTextarea
              resizable={false}
              footer={() => <TextBoxFooter text={ocrResult?.dest_text || ''} />}
              disabled
              value={ocrResult?.dest_text}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface IResult {
  ocrResults: ITaskHistoryDetail[];
}

const ListTranslationHistory = (props: IResult) => {
  const { ocrResults } = props;

  return (
    <div className="w-full h-full relative border border-gray-200 p-1 divide-y divide-stone-200 rounded-lg bg-white">
      <div className="w-full h-full p-4 divide-y divide-stone-400">
        {ocrResults.map((r) => {
          return <TranslateHistoryItem taskDetail={r} key={r.fileid} />;
        })}
      </div>
    </div>
  );
};

export default ListTranslationHistory;

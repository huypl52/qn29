import { useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { MdSmsFailed } from 'react-icons/md';
import { toast } from 'react-toastify';
import LoadingText from '~/component/LoadingText';
import { StructureTextarea } from '~/component/Textarea';
import { EProcessStatus } from '~/type/ocr';
import { ITaskHistoryDetail } from '~/type/task';
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
        <div className="w-full flex gap-2 pl-2">
          <div className="w-1/2">
            <StructureTextarea
              resizable={false}
              footer={() => (
                <TextBoxFooter text={ocrResult?.source_text || ''} />
              )}
              disabled
              value={ocrResult?.source_text}
            />
          </div>
          <div className="w-1/2 ">
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

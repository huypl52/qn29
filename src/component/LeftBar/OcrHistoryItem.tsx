import { useEffect, useState } from 'react';
import { useOcrContext } from '../../feature/ocr/context';
import { BaseTextarea, StructureTextarea } from '~/component/Textarea';
import { ITaskDetail, ITaskHistoryDetail } from '~/type/task';
import { useTaskStore } from '~/store/task';
import { getOcrDetail } from '~/service/ocr';
import { EProcessStatus } from '~/type/ocr';
import { getImage, getTaskDetails } from '~/service/task';
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
  ocrTask: ITaskHistoryDetail;
}

const HistoryItem = (props: IItemTask) => {
  const { subTaskId, ocrTask: ocrTask } = props;
  const { selectedTaskId } = useTaskStore();
  const { needTranslate } = useOcrContext();
  const [img, setImg] = useState<string>();
  const [ocrResult, setOcrResult] = useState<ITaskHistoryDetail | undefined>(
    ocrTask
  );

  useEffect(() => {
    const ocr = ocrResult;
    if (!ocr) return;
    if (ocr.fileid) {
      getImage(ocr.fileid).then((res) => {
        const { status, data } = res;
        if (status === 200) {
          const binaryString = String.fromCharCode(...new Uint8Array(data));
          const base64Image = btoa(binaryString);
          const imageUrl = `data:image/png;base64,${base64Image}`;
          setImg(imageUrl);
        }
      });
    }
  }, [ocrResult]);

  return (
    <div className="flex w-full divide-x divide-stone-400 gap-4 py-2">
      <div className="w-1/2 min-w-32 h-1/3 min-h-16">
        {/* <p className="text-sm font-medium text-gray-600">{f.name}</p> */}
        <img
          src={img}
          // alt={f.name}
          className="object-contain w-full h-full"
        />
      </div>

      {ocrTask.status === EProcessStatus.pending ? (
        <LoadingText />
      ) : ocrTask.status === EProcessStatus.failed ? (
        <div className="w-1/2 h-auto flex flex-col justify-center items-center text-red-800">
          <div className="border border-red-600 rounded-full p-3 ">
            <MdSmsFailed size={40} />
          </div>
          <span>Thất bại</span>
        </div>
      ) : (
        <div className="w-1/2 pl-2">
          <div>
            <StructureTextarea
              resizable={false}
              footer={() => (
                <TextBoxFooter text={ocrResult?.detected_text || ''} />
              )}
              disabled
              value={ocrResult?.detected_text}
            />
          </div>
          {needTranslate ? (
            <div className="border-t mt-2">
              <StructureTextarea
                resizable={false}
                footer={() => (
                  <TextBoxFooter text={ocrResult?.dest_text || ''} />
                )}
                disabled
                value={ocrResult?.dest_text}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

interface IResult {
  ocrResults: ITaskHistoryDetail[];
}

const ListOcrHistory = (props: IResult) => {
  const { ocrResults } = props;

  return (
    <div className="w-full h-full relative border border-gray-200 p-1 divide-y divide-stone-200 rounded-lg bg-white">
      <div className="w-full h-full p-4 divide-y divide-stone-400">
        {ocrResults.map((r) => {
          return <HistoryItem ocrTask={r} />;
        })}
      </div>
    </div>
  );
};

export default ListOcrHistory;

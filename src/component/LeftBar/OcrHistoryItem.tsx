import { useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { MdSmsFailed } from 'react-icons/md';
import { toast } from 'react-toastify';
import LoadingText from '~/component/LoadingText';
import { StructureTextarea } from '~/component/Textarea';
import { getImage } from '~/service/task';
import { EProcessStatus } from '~/type/ocr';
import { ITaskHistoryDetail } from '~/type/task';
import { copyToClipboard } from '~/utils/clipboard';
import { useOcrContext } from '../../feature/ocr/context';

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
  ocrTask: ITaskHistoryDetail;
}

const HistoryItem = (props: IItemTask) => {
  const { subTaskId, ocrTask: ocrTask } = props;
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
        const { status, data, headers } = res;
        if (status === 200) {
          const blob = new Blob([data], {
            type: headers['content-type'],
          });
          const url = URL.createObjectURL(blob);
          setImg(url);
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
                <TextBoxFooter
                  text={
                    ocrResult?.detected_text || ocrResult?.source_text || ''
                  }
                />
              )}
              disabled
              value={ocrResult?.detected_text || ocrResult?.source_text || ''}
            />
          </div>
          {needTranslate ? (
            <div className="border-t mt-2">
              <StructureTextarea
                resizable={false}
                footer={() => <TextBoxFooter text={ocrResult?.dest_text || ''} />}
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

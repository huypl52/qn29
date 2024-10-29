import { useEffect, useState } from 'react';
import { useOcrContext } from './context';
import { StructureTextarea } from '~/component/Textarea';
import { ITaskDetail, ITaskHistoryDetail } from '~/type/task';
import { EProcessStatus } from '~/type/ocr';
import { getImage, getTaskDetails } from '~/service/task';
import { toast } from 'react-toastify';
import { FaRegCopy } from 'react-icons/fa';
import _ from 'lodash';
import LoadingText from '~/component/LoadingText';

import { MdSmsFailed } from 'react-icons/md';
import { useTaskStore } from '~/store/task';

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
  taskId?: string;
  ocrTaskResult: ITaskDetail;
}

const QUERY_TIMEOUT = 10000;
const FAILED_TIMEOUT = QUERY_TIMEOUT + 3000;

const Item = (props: IItemTask) => {
  const { taskId, ocrTaskResult } = props;
  const [taskDetailStatus, setTaskDetailStatus] = useState<EProcessStatus>(
    // ocrTaskResult ? EProcessStatus.success : EProcessStatus.pending
    EProcessStatus.pending
  );
  const { needTranslate } = useOcrContext();
  const [img, setImg] = useState<string>();
  const [ocrResult, setOcrResult] = useState<ITaskDetail | undefined>(
    ocrTaskResult
  );
  const { counter } = useTaskStore();

  useEffect(() => {
    setTaskDetailStatus(EProcessStatus.pending);
  }, [counter]);

  useEffect(() => {
    if (taskDetailStatus !== EProcessStatus.pending) {
      return;
    }

    const neededFields: (keyof ITaskDetail)[] = ['detected_text'];
    if (needTranslate) {
      neededFields.push('dest_text');
    }

    // console.log({ ocrResult, taskId });
    if (_.every(neededFields, (k) => _.has(ocrResult, k))) {
      setTaskDetailStatus(EProcessStatus.success);
      return;
    }

    if (!taskId) return;
    if (!ocrResult) return;

    // console.log(`start query ${ocrTaskResult}`);
    const intervalRef = setInterval(() => {
      getTaskDetails(taskId).then((res) => {
        const { status, data } = res;
        if (status !== 200) {
          return;
        }
        const newOcrTaskResult = data.find((d) => d.ocrid === ocrResult.ocrid);
        const success = _.every(neededFields, (k) =>
          _.has(newOcrTaskResult, k)
        );
        // console.log({ newOcrTaskResult, success });
        if (success) {
          setTaskDetailStatus(EProcessStatus.success);
          setOcrResult(newOcrTaskResult);
        }
      });
    }, 1000);

    const timeoutRef = setTimeout(
      () => clearInterval(intervalRef),
      QUERY_TIMEOUT
    );

    const failTimeoutRef = setTimeout(() => {
      if (taskDetailStatus.valueOf() !== EProcessStatus.success.valueOf()) {
        setTaskDetailStatus(EProcessStatus.failed);
      }
    }, FAILED_TIMEOUT);

    return () => {
      clearTimeout(timeoutRef);
      clearInterval(intervalRef);
      clearTimeout(failTimeoutRef);
    };
  }, [taskId, needTranslate, taskDetailStatus, ocrResult]);

  useEffect(() => {
    setOcrResult(ocrTaskResult);
  }, [ocrTaskResult]);

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
    <div className="flex w-full divide-x divide-stone-400  bg-gray-100 gap-4 py-2 overflow-y-auto">
      <div className="w-1/2 min-w-32 h-1/3 min-h-16 my-auto">
        {/* <p className="text-sm font-medium text-gray-600">{f.name}</p> */}
        <img
          src={img}
          // alt={f.name}
          alt="no load image"
          className="object-contain max-w-100 max-h-[30vh] mx-auto"
        />
      </div>

      {taskDetailStatus === EProcessStatus.pending ? (
        <LoadingText />
      ) : taskDetailStatus === EProcessStatus.failed ? (
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
              className="h-[29vh]"
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
                className="h-[25vh]"
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

interface IResult {
  taskId: string;
  ocrTaskResults: ITaskDetail[];
}

const ListResult = (props: IResult) => {
  const { ocrTaskResults, taskId } = props;

  return (
    <div className="w-full relative border border-gray-200 p-1 divide-y divide-stone-200 rounded-lg bg-gray-100 overflow-y-auto h-[75vh]">
      <div className="w-full p-4 divide-y divide-stone-400 h-full">
        {ocrTaskResults.map((r) => {
          return <Item ocrTaskResult={r} taskId={taskId} />;
        })}
      </div>
    </div>
  );
};

export default ListResult;

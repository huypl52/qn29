import { useCallback, useEffect, useState } from 'react';
import { useOcrContext } from './context';
import { StructureTextarea } from '~/component/Textarea';
import { ITaskDetail, ITaskHistoryDetail } from '~/type/task';
import { EProcessStatus } from '~/type/ocr';
import { getImage, getTaskDetails } from '~/service/task';
import { toast } from 'react-toastify';
import { FaRegCopy } from 'react-icons/fa';
import _ from 'lodash';
import LoadingText from '~/component/LoadingText';
import { IoTimeOutline } from 'react-icons/io5';
import { MdSmsFailed } from 'react-icons/md';
import { useTaskStore } from '~/store/task';
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
  ocr?: EProcessStatus;
  translation?: EProcessStatus;
}

interface IItemTask {
  taskId?: string;
  ocrTaskResult: ITaskDetail;
}

const QUERY_TIMEOUT = 10000;
const FAILED_TIMEOUT = QUERY_TIMEOUT + 3000;

const Item = (props: IItemTask) => {
  const { taskId, ocrTaskResult } = props;
  const [taskDetailStatus, setTaskDetailStatus] = useState<IItemTaskStatus>({
    ocr: EProcessStatus.pending,
    translation: EProcessStatus.pending,
  });
  const { needTranslate } = useOcrContext();
  const [img, setImg] = useState<string>();
  const [ocrResult, setOcrResult] = useState<ITaskDetail | undefined>(
    ocrTaskResult
  );
  const { counter } = useTaskStore();

  useEffect(() => {
    setTaskDetailStatus({
      ocr: EProcessStatus.pending,
      translation: EProcessStatus.pending,
    });
  }, [counter]);

  const fetchTaskItem = useCallback(() => {
    const detailStatus = _.cloneDeep(taskDetailStatus);
    console.log({ fetchTaskItemStatus: detailStatus });
    if (
      detailStatus.ocr !== EProcessStatus.pending &&
      detailStatus.translation !== EProcessStatus.pending
    ) {
      console.log('All fullfilled');
      return;
    }

    if (
      ocrResult?.ocr_status === EProcessStatus.success &&
      ocrResult.translation_status === EProcessStatus.success
    ) {
      console.log('All success');
      return;
    }

    if (!taskId) return;
    if (!ocrResult) return;

    console.log(`fetchTaskItem`);
    const intervalRef = setInterval(() => {
      getTaskDetails(taskId).then((res) => {
        const { status, data } = res;
        if (status !== 200) {
          return;
        }
        console.log({ fetchTask: { taskId, ocrResult } });
        const newOcrTaskResult = data.find((d) => d.ocrid === ocrResult.ocrid);
        console.log({ newOcrTaskResult });
        if (!newOcrTaskResult) return;

        detailStatus.ocr = newOcrTaskResult.ocr_status;
        detailStatus.translation = newOcrTaskResult.translation_status;

        setTaskDetailStatus(detailStatus);
        setOcrResult(newOcrTaskResult);
        console.log({ detailStatus });
      });
    }, 1000);

    const timeoutRef = setTimeout(
      () => clearInterval(intervalRef),
      QUERY_TIMEOUT
    );

    const failTimeoutRef = setTimeout(() => {
      if (detailStatus.ocr === EProcessStatus.pending) {
        detailStatus.ocr = EProcessStatus.failed;
      }
      if (detailStatus.translation === EProcessStatus.pending) {
        detailStatus.translation = EProcessStatus.failed;
      }
      setTaskDetailStatus(detailStatus);
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

  useEffect(() => fetchTaskItem(), [fetchTaskItem]);
  console.log({ ocrResult, taskDetailStatus, ocrTaskResult, taskId });

  return (
    <div className="flex w-full divide-x divide-stone-400  bg-gray-100 gap-4 py-2 overflow-y-auto">
      <div className="w-1/2 min-w-32 h-1/3 min-h-16 my-auto">
        <img
          src={img}
          alt="load image loaded"
          className="object-contain max-w-100 max-h-[30vh] mx-auto"
        />
      </div>

      <div className="w-1/2 pl-2">
        {taskDetailStatus.ocr === EProcessStatus.pending ? (
          <LoadingText />
        ) : taskDetailStatus.ocr === EProcessStatus.failed ? (
          <div className="w-1/2 h-auto flex flex-col justify-center items-center text-red-800">
            <div className="border border-red-600 rounded-full p-3 ">
              <MdSmsFailed size={40} />
            </div>
            <span>Thất bại</span>
          </div>
        ) : taskDetailStatus.ocr === EProcessStatus.timeout ? (
          <div className="w-1/2 h-auto flex flex-col justify-center items-center text-red-800">
            <div className="border border-red-600 rounded-full p-3 ">
              <IoTimeOutline size={40} />
            </div>
            <span>Hết hạn</span>
          </div>
        ) : (
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
        )}

        {!needTranslate ? null : taskDetailStatus.translation ===
          EProcessStatus.pending ? (
          <LoadingText />
        ) : taskDetailStatus.translation === EProcessStatus.failed ? (
          <div className="w-1/2 h-auto flex flex-col justify-center items-center text-red-800">
            <div className="border border-red-600 rounded-full p-3 ">
              <MdSmsFailed size={40} />
            </div>
            <span>Thất bại</span>
          </div>
        ) : taskDetailStatus.translation === EProcessStatus.timeout ? (
          <div className="w-1/2 h-auto flex flex-col justify-center items-center text-red-800">
            <div className="border border-red-600 rounded-full p-3 ">
              <IoTimeOutline size={40} />
            </div>
            <span>Hết hạn</span>
          </div>
        ) : (
          <div className="border-t mt-2">
            <StructureTextarea
              resizable={false}
              footer={() => <TextBoxFooter text={ocrResult?.dest_text || ''} />}
              disabled
              value={ocrResult?.dest_text}
              className="h-[25vh]"
            />
          </div>
        )}
      </div>
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

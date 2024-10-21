import { useEffect, useState } from 'react';
import { useOcrContext } from './context';
import { useDragDropContext } from '~/component/Drag&Drop/context';
import { BaseTextarea } from '~/component/Textarea';
import { ITaskDetail } from '~/type/task';
import { useOcrTaskStore } from '~/store/taskOcr';
import { useTaskStore } from '~/store/task';
import { getOcrDetail } from '~/service/ocr';
import { EProcessStatus } from '~/type/ocr';
import { getImage, getTaskDetails } from '~/service/task';

interface IOcrTask {
  id: string;
  result?: ITaskDetail;
}

const OcrItem = (ocrTask: IOcrTask) => {
  const { result } = ocrTask;
  const { selectedTaskId } = useTaskStore();
  const [ocrStatus, setOcrStatus] = useState(
    result ? EProcessStatus.success : EProcessStatus.pending
  );
  const { needTranslate } = useOcrContext();

  const [img, setImg] = useState<string>();

  const [ocrResult, setOcrResult] = useState<ITaskDetail | undefined>(result);

  useEffect(() => {
    if (ocrStatus !== EProcessStatus.pending) {
      return;
    }
    const intervalRef = setInterval(() => {
      getOcrDetail(ocrTask.id).then((res) => {
        const { status, data } = res;
        if (status !== 200) {
          return;
        }
        const { status: success } = data;
        console.log({ success, data });
        setOcrStatus(success);
      });
    }, 1000);

    const timeoutRef = setTimeout(() => clearInterval(intervalRef), 3000);
    return () => {
      clearTimeout(timeoutRef);
      clearInterval(intervalRef);
    };
  }, [ocrTask.id]);

  useEffect(() => {
    if (ocrStatus === EProcessStatus.pending) {
      return;
    }
    if (ocrStatus === EProcessStatus.success) {
      const fetchTask = async () => {
        if (selectedTaskId) {
          getTaskDetails(selectedTaskId).then((res) => {
            const { status, data } = res;
            console.log({ getTaskDetails: status, data });
            if (status !== 200) {
              console.log(`Get task detail failed: ${selectedTaskId}`);
              return;
            }
            const ocr = data.find(({ ocrid }) => ocrid === ocrTask.id);
            if (ocr) {
              setOcrResult(ocr);
            }
          });
        }
      };
      if (result) {
        fetchTask();
      } else {
        setTimeout(fetchTask, 5000);
      }
    }
  }, [ocrStatus, ocrTask.id]);

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

      {ocrStatus === EProcessStatus.pending ? (
        'processing...'
      ) : ocrStatus === EProcessStatus.failed ? (
        'failed!!!'
      ) : (
        <div className="w-1/2 pl-2">
          <div>
            <BaseTextarea value={ocrResult?.detected_text} disabled />
          </div>
          {needTranslate ? (
            <div className="border-t border-gray-400 px-2 mt-2">
              <BaseTextarea value={ocrResult?.dest_text} disabled />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

interface IResult {
  ocrResults: IOcrTask[];
}

const OcrResult = (props: IResult) => {
  const { ocrResults } = props;

  return (
    <div className="w-full h-full relative border border-gray-200 p-1 divide-y divide-stone-200 rounded-lg">
      <div className="w-full h-full p-4 divide-y divide-stone-400">
        {ocrResults.map(({ id, result }) => {
          return <OcrItem id={id} result={result} />;
        })}
      </div>
    </div>
  );
};

export default OcrResult;

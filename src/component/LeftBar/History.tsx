import React, { useEffect, useState } from 'react';
import ItemHistory from '~/component/LeftBar/ItemHistory'; // Import icons
import { getTaskHistory } from '~/service/task';
import { ETaskType, ITaskHistory } from '~/type/task';

const History: React.FC<{
  updateViewHistory: (status: boolean) => void;
}> = ({ updateViewHistory }) => {
  const taskType = ETaskType.OCR;
  // const {tasks,} = useTaskStore()
  const [taskHistories, setTaskHistories] = useState<ITaskHistory[]>([]);

  useEffect(() => {
    getTaskHistory()
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setTaskHistories(data);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  return (
    <div className="p-4 min-h-screen-minus-4rem bg-white shadow-md rounded-lg max-w-lg">
      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">Các bản dịch đã thực hiện</h2>
        <button
          className="text-sm hover:bg-gray-300 w-7 h-7 rounded-[50%]"
          onClick={() => updateViewHistory(false)}
        >
          X
        </button>
      </div>
      <div className="mb-4 flex justify-end">
        <button className="text-blue-600 text-sm">
          Xóa toàn bộ các bản dịch đã thực hiện
        </button>
      </div>
      <div className="h-[80vh] overflow-y-scroll">
        {taskHistories
          // TODO: fix task type null is OCR
          .filter((t) => t.type === null)
          .slice(0, 2)
          .map((t) => (
            <ItemHistory taskType={ETaskType.OCR} taskHistory={t} />
          ))}
      </div>
    </div>
  );
};

export default History;


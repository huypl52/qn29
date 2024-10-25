import React, { useCallback, useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import ItemHistory from '~/component/LeftBar/ItemHistory';
import Pagination from '~/component/LeftBar/Pagination/Pagination.tsx'; // Import icons
import { getTaskHistory, getTotalTaskHistory } from '~/service/task';
import { useTaskStore } from '~/store/task';
import { ITaskHistory } from '~/type/task';
import _ from 'lodash';

const take = 20;

const History: React.FC<{
  updateViewHistory: (status: boolean) => void;
}> = ({ updateViewHistory }) => {
  const [taskHistories, setTaskHistories] = useState<ITaskHistory[]>([]);

  const [choiseList, setChoiseList] = useState<ITaskHistory[]>([]);

  // const [pageNum, setPageNum] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const { type, counter } = useTaskStore();

  let taskType = type;

  const handlePageChange = useCallback((num: number) => {
    // setPageNum(num);
    updateHistoryData(num);
  }, []);

  const updateHistoryData = useCallback((page: number) => {
    const skip = take * (page - 1);

    // console.log({ page, skip, take });
    getTaskHistory(skip, take, taskType)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setTaskHistories([...data]);
          console.log({ setTaskHistories: data });
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  useEffect(() => {
    console.log({ getTaskHistory: taskType });
    updateHistoryData(1);
    getTotalTaskHistory()
      .then((res) => {
        const { status, data } = res;
        console.log({ status, data });
        if (status !== 200) {
          setTotalPage(1);
          return;
        }
        setTotalPage(_.ceil(data.total / take));
      })
      .catch((err) => console.log({ err }));
  }, [taskType, counter]);

  const handleClickDelete = () => {
    const newHistories = taskHistories.filter(
      (t) => !choiseList.some((itemA) => t.id === itemA.id)
    );
    setTaskHistories(newHistories);
    setChoiseList([]);
  };

  return (
    <div className="p-4 min-h-screen-minus-4rem bg-white shadow-md rounded-tl-lg rounded-bl-lg w-[30vw]">
      <div className="mb-4 flex start ">
        <button
          className="flex items-center bg-blue-500 text-white font-semibold px-2 py-1 rounded-lg shadow-lg hover:bg-blue-600 transition"
          onClick={() => updateViewHistory(false)}
        >
          →
        </button>
        <h2 className="text-lg px-2  font-semibold">
          Các bản dịch đã thực hiện
        </h2>
        {/* <button */}
        {/*   className="text-sm hover:bg-gray-300 w-7 h-7 rounded-[50%]" */}
        {/*   onClick={() => updateViewHistory(false)} */}
        {/* > */}
        {/*   X */}
        {/* </button> */}
      </div>
      <div className="mb-4 flex justify-end">
        <button
          className="flex items-center px-4 py-2 text-sm text-red-600"
          onDoubleClick={handleClickDelete}
        >
          <FaTrashAlt className="mr-2" />
        </button>
      </div>
      <div className="h-[75vh] overflow-auto">
        {taskHistories
          // .filter((t) => t.type === taskType)
          // .slice(0, 2)
          .map((t) => (
            <ItemHistory
              taskType={taskType}
              taskHistory={t}
              taskList={choiseList}
              setTaskList={setChoiseList}
            />
          ))}
      </div>
      <div className="h-[5vh]">
        <Pagination totalPages={totalPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default History;

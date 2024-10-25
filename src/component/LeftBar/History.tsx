import React, { useEffect, useState } from 'react';
import { FaTrashAlt }                 from 'react-icons/fa';
import ItemHistory from '~/component/LeftBar/ItemHistory';
import Pagination from '~/component/LeftBar/Pagination/Pagination.tsx'; // Import icons
import { getTaskHistory } from '~/service/task';
import { useTaskStore } from '~/store/task';
import { ITaskHistory } from '~/type/task';

const History: React.FC<{
  updateViewHistory: (status: boolean) => void;
}> = ({ updateViewHistory }) => {
  const [taskHistories, setTaskHistories] = useState<ITaskHistory[]>([]);

  const [choiseList, setChoiseList] = useState<ITaskHistory[]>([]);

  const { type, counter } = useTaskStore();

  let taskType = type;

  useEffect(() => {
    console.log({ getTaskHistory: taskType });
    const getTaskRef = setTimeout(
      () =>
        getTaskHistory(undefined, undefined, taskType)
          .then((res) => {
            const { status, data } = res;
            if (status === 200) {
              setTaskHistories([...data]);
              console.log({ setTaskHistories: data });
            }
          })
          .catch((err) => {
            console.log({ err });
          }),
      2000
    );
    return () => clearTimeout(getTaskRef);
  }, [taskType, counter]);

  // useEffect(() => {
  //   console.log('Data deleted', taskHistories);
  // }, [taskHistories]);

  const handleClickDelete = () => {
    const newHistories = taskHistories.filter(
      (t) => !choiseList.some((itemA) => t.id === itemA.id)
    );
    setTaskHistories(newHistories);
    setChoiseList([]);
  };

  const handleClickDeleteAll = () => {
    setTaskHistories([]);
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
        <h2 className="text-lg px-2  font-semibold">Các bản dịch đã thực hiện</h2>
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
        {/* <button */}
        {/*   className="text-blue-600 text-sm ml-2" */}
        {/*   onDoubleClick={handleClickDeleteAll} */}
        {/* > */}
        {/*   Xoá tất cả */}
        {/* </button> */}
      </div>
      <div className="h-[75vh] overflow-auto">
        {taskHistories
          .filter((t) => t.type === taskType)
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
        <Pagination totalPages={5} />
      </div>
    </div>
  );
};

export default History;

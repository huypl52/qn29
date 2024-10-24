import React, { useCallback, useEffect, useState } from 'react';
import { FaEllipsisV, FaTrashAlt } from 'react-icons/fa'; // Import icons
import ListOcrHistory from '~/component/LeftBar/OcrHistoryItem';
import { getTaskDetails } from '~/service/task';
import { useTaskStore } from '~/store/task';
import { useOcrTaskStore } from '~/store/taskOcr';
import {
  ETaskType,
  ITaskDetail,
  ITaskHistory,
  LTaskTypeOcr,
  LTaskTypeTranslate,
} from '~/type/task';
import ListTranslationHistory from './TranslationHistoryItem';
import { useTranslateStore } from '~/store/translate';
import { DLangMap } from '~/type';
import { formatViDate } from '~/utils/date';

interface IItemHistory {
  taskType: ETaskType;
  taskHistory: ITaskHistory;
  taskList: ITaskHistory[];
  setTaskList: React.Dispatch<React.SetStateAction<ITaskHistory[]>>;
}

const ItemHistory = (props: IItemHistory) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false); // State to track favorite status

  const { taskHistory, taskList, setTaskList, taskType } = props;

  // Toggle the visibility of the dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle the delete action
  const handleDelete = () => {
    console.log('Data deleted');
    // Implement your data deletion logic here
    setShowDropdown(false); // Close the dropdown after deleting
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    // If checked, add the task to the taskList
    if (!isFavorite) {
      setTaskList((prevList) => [...prevList, taskHistory]);
    } // If unchecked, remove the task from the taskList
    else {
      setTaskList((prevList) =>
        prevList.filter((t) => t.id !== taskHistory.id)
      );
    }
    console.log(1, taskList);
  };
  const { updateRecentAdded } = useOcrTaskStore();
  const { putTaskDetails, changeTaskType } = useTaskStore();

  const handleOpenDetail = useCallback(() => {
    updateRecentAdded(false);
    // putTaskDetails(ocrTasks);
    console.log({ handleOpenDetailTaskHistory: taskHistory });
    getTaskDetails(taskHistory.id)
      .then((res) => {
        const { status, data } = res;
        if (status !== 200) return;
        putTaskDetails(data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const { srcLang, targetLang } = useTranslateStore();

  const tranlationTitle =
    `${DLangMap[srcLang]}` + '→' + `${DLangMap[targetLang]}`;

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <div className="relative flex justify-between items-center">
        <h3
          className="text-md font-semibold align-middle cursor-pointer"
          onClick={handleOpenDetail}
        >
          {LTaskTypeTranslate.includes(taskType)
            ? tranlationTitle
            : 'Trung → Việt'}
        </h3>
        <div className="flex">
          {/* Favorite Star */}
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={toggleFavorite}
            className="mr-2 h-5 w-5 border border-gray-300 rounded checked:bg-yellow-500 checked:border-transparent focus:outline-none"
          />

          {/* More Options (Three Dots) */}
          <button
            className="text-gray-400 text-md font-semibold rounded-[50%] text-center hover:text-gray-600 focus:outline-none"
            onClick={toggleDropdown} // Toggle dropdown visibility
          >
            <FaEllipsisV />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-full right-0 mt-1 bg-white border shadow-md rounded-lg z-10 w-36">
              <button
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                onClick={handleDelete} // Handle delete action
              >
                <FaTrashAlt className="mr-2" /> Xóa
              </button>
            </div>
          )}
        </div>
      </div>
      <div>{formatViDate(new Date(taskHistory.created_time))}</div>

      {taskHistory.details?.length && LTaskTypeOcr.includes(taskType) ? (
        <ListOcrHistory
          ocrResults={taskHistory.details}
          // ocrResults={ocrTasks.map((t) => ({ id: t.ocrid || '', result: t }))}
        />
      ) : null}
      {taskHistory.details?.length && LTaskTypeTranslate.includes(taskType) ? (
        <ListTranslationHistory
          ocrResults={taskHistory.details}
          // ocrResults={ocrTasks.map((t) => ({ id: t.ocrid || '', result: t }))}
        />
      ) : null}
    </div>
  );
};

export default ItemHistory;

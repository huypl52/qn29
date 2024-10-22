import React, { useCallback, useEffect, useState } from 'react';
import { FaEllipsisV, FaStar, FaTrashAlt } from 'react-icons/fa'; // Import icons
import OcrResult from '~/feature/ocr/Result';
import { getTaskDetails } from '~/service/task';
import { useTaskStore } from '~/store/task';
import { useOcrTaskStore } from '~/store/taskOcr';
import { ETaskType, ITaskDetail, ITaskHistory } from '~/type/task';

interface IItemHistory {
  taskType: ETaskType;
  taskHistory: ITaskHistory;
}

const ItemHistory = (props: IItemHistory) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false); // State to track favorite status

  const { taskHistory } = props;
  const [ocrTasks, setOcrTasks] = useState<ITaskDetail[]>([]);
  // Toggle the visibility of the dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    getTaskDetails(taskHistory.id).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        console.log({ setOcrTasks: data });
        setOcrTasks(data);
      }
    });
  }, [taskHistory.id]);

  // Function to handle the delete action
  const handleDelete = () => {
    console.log('Data deleted');
    // Implement your data deletion logic here
    setShowDropdown(false); // Close the dropdown after deleting
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev); // Toggle the favorite state
  };

  const { updateRecentAdded } = useOcrTaskStore();
  const { putTaskDetails, changeTaskType } = useTaskStore();

  const handleOpenDetail = useCallback(() => {
    updateRecentAdded(false);
    putTaskDetails(ocrTasks);
    console.log({ clickTasks: ocrTasks });
  }, [ocrTasks]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <div className="relative flex justify-between items-center">
        <h3
          className="text-md font-semibold align-middle cursor-pointer"
          onClick={handleOpenDetail}
        >
          Trung → Việt
        </h3>
        <div className="flex">
          {/* Favorite Star */}
          <button
            className={`text-md font-semibold focus:outline-none text-center hover:text-yellow-500 ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400'
            }`} // Change color based on state
            onClick={toggleFavorite} // Toggle favorite status
          >
            <FaStar />
          </button>

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

      {ocrTasks?.length ? (
        <OcrResult
          ocrResults={ocrTasks.map((t) => ({ id: t.ocrid || '', result: t }))}
        />
      ) : null}
    </div>
  );
};

export default ItemHistory;

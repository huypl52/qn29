import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import ItemHistory from '~/component/LeftBar/ItemHistory';
import Pagination from '~/component/LeftBar/Pagination/Pagination.tsx'; // Import icons
import { getTaskHistory, getTotalTaskHistory } from '~/service/task';
import { useTaskStore } from '~/store/task';
import { ITaskHistory } from '~/type/task';
import _ from 'lodash';
import {
  convertSearchResultsToTaskHistories,
  ISearchParam,
  ISearchResult,
} from '~/type/report';
import SearchFilter from './SearchFilter';
import { searchContent } from '~/service/report';

const take = 20;

const History: React.FC<{
  updateViewHistory: (status: boolean) => void;
}> = ({ updateViewHistory }) => {
  const [taskHistories, setTaskHistories] = useState<ITaskHistory[]>([]);

  const [searchParam, setSearchQuery] = useState<ISearchParam>();

  const [choiseList, setChoiseList] = useState<ITaskHistory[]>([]);

  const [totalPage, setTotalPage] = useState(1);

  const { type, counter } = useTaskStore();

  let taskType = type;

  const isSearching = useMemo(() => {
    if (!searchParam) return false;
    const nonEmptyParam = _.pickBy(searchParam, (v) => !!v);
    if (Object.keys(nonEmptyParam).length) return true;
    return false;
  }, [searchParam]);

  const handlePageChange = useCallback(
    (num: number) => {
      if (isSearching) {
      } else {
        updateHistoryData(num);
      }
    },
    [isSearching]
  );

  const updateHistoryData = useCallback(
    (page: number) => {
      const skip = take * (page - 1);

      if (isSearching) {
      }
      getTaskHistory(skip, take, taskType)
        .then((res) => {
          const { status, data } = res;
          if (status === 200) {
            setTaskHistories([...data]);
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    },
    [isSearching]
  );

  const updatePaging = useCallback(() => {
    if (isSearching) {
    } else {
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
    }
  }, [isSearching]);

  useEffect(() => {
    updateHistoryData(1);
    updatePaging();
  }, [taskType, counter, isSearching]);

  const handleClickDelete = () => {
    const newHistories = taskHistories.filter(
      (t) => !choiseList.some((itemA) => t.id === itemA.id)
    );
    setTaskHistories(newHistories);
    setChoiseList([]);
  };

  useEffect(() => {
    if (!isSearching) return;
    const nonEmptyParam = _.pickBy(searchParam, (v) => !!v);
    searchContent(nonEmptyParam).then((res) => {
      const { data, status } = res;
      if (status !== 200) return;
      console.log({ data, nonEmptyParam });
      const taskHistories = convertSearchResultsToTaskHistories(data);
      setTaskHistories(taskHistories);
    });
  }, [isSearching, searchParam]);

  return (
    <div className="p-4 min-h-screen-minus-4rem bg-white shadow-md rounded-tl-lg rounded-bl-lg w-[30vw]">
      <div className="mb-4 flex start items-center ">
        <button
          className="flex items-center leading-normal text-red-600 font-semibold px-2 py-1  hover:bg-red-300 rounded transition"
          onClick={() => updateViewHistory(false)}
        >
          &gt;
        </button>
        <h2 className="text-lg px-2  font-semibold">Các tác vụ đã thực hiện</h2>
        <SearchFilter
          onSubmit={(v) => {
            setSearchQuery(v);
          }}
        />
        {/* <button */}
        {/*   className="text-sm hover:bg-gray-300 w-7 h-7 rounded-[50%]" */}
        {/*   onClick={() => updateViewHistory(false)} */}
        {/* > */}
        {/*   X */}
        {/* </button> */}
      </div>
      {/* <div className="mb-4 flex justify-end"> */}
      {/*   <button */}
      {/*     className="flex items-center px-4 py-2 text-sm text-red-600" */}
      {/*     onDoubleClick={handleClickDelete} */}
      {/*   > */}
      {/*     <FaTrashAlt className="mr-2" /> */}
      {/*   </button> */}
      {/* </div> */}
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
      <div className="h-[5vh] mt-2">
        <Pagination totalPages={totalPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default History;

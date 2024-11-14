import { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useCardContext } from '~/page/Report/context';
import {
  getStatisticalOcrHistory,
  getStatisticalOcrHistoryTranslate,
} from '~/service/task.ts';
import { getUserRole } from '~/storage/auth';
import { useUserTreeStore } from '~/store/userTree';
import { IStatisticalParam } from '~/type/task';
import { ERole } from '~/type/user';

const OCRChart = () => {
  const [dataType, setDataType] = useState('text'); // Default to 'text' data
  const { timeScale, setTimeScale, setDateRange, dateRange } = useCardContext();
  const [startDate, endDate] = dateRange;
  const [x, setX] = useState<string[]>([]);
  const [y, setY] = useState<number[]>([]);
  const today = new Date();

  const { selectedNodeId } = useUserTreeStore();
  const userRole = getUserRole();
  const isAdmin = userRole === ERole.admin ? true : false;

  const fetchData = useCallback(
    async (groupvalue = 0, from_date?: string, to_date?: string) => {
      try {
        const requestParams: IStatisticalParam = {
          group: groupvalue,
          from_date: from_date
            ? from_date
            : undefined,
          to_date: to_date ? to_date: undefined,
        };

        if (!isAdmin) {
          requestParams['self'] = 1;
        } else {
          if (selectedNodeId) {
            requestParams['userid'] = selectedNodeId;
          }
        }

        const response =
          dataType === 'text'
            ? await getStatisticalOcrHistory(requestParams)
            : await getStatisticalOcrHistoryTranslate(requestParams);

        const nameList = response.data.map((item: any) => item.name);
        const valueList = response.data.map((item: any) =>
          dataType === 'text' ? item.ocr_converted : item.ocr_translated
        );

        setX(nameList);
        setY(valueList);

        // console.log('Fetched data for:', dataType);
        // console.log(nameList);
        // console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    [dataType, isAdmin, selectedNodeId]
  );

  const oneWeekAgo = (): Date =>
    new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

  const getWeekRange = () => {
    const today = new Date();

    // Tính ngày đầu tuần (thứ Hai)
    const firstDayOfWeek = new Date(today);
    const day = firstDayOfWeek.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day; // Nếu Chủ Nhật, chuyển về thứ Hai tuần trước
    firstDayOfWeek.setDate(today.getDate() + diffToMonday);

    // Tính ngày cuối tuần (Chủ Nhật)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    return { start: firstDayOfWeek, end: lastDayOfWeek };
  };

  useEffect(() => {
    // console.log({startDate, endDate})
    fetchData(
      timeScale === 'day' ? 0 : timeScale === 'month' ? 1 : 2,
      startDate ,
      endDate 
    );
  }, [
    startDate,
    endDate,
    timeScale,
    fetchData,
  ]);

  const chartData = {
    labels: x,
    datasets: [
      {
        label: `Số lần sử dụng theo ${
          timeScale === 'day' ? 'ngày' : timeScale === 'month' ? 'tháng' : 'năm'
        } (${dataType === 'text' ? 'Đã quét' : 'Đã dịch'})`,
        data: y,
        backgroundColor:
          dataType === 'text'
            ? 'rgba(75, 192, 192, 0.5)'
            : 'rgba(54, 162, 235, 0.5)',
        borderColor:
          dataType === 'text'
            ? 'rgba(75, 192, 192, 1)'
            : 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-[1/2] mx-auto mt-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold ">
          Biểu đồ sử dụng quét và dịch ảnh
        </h2>
        <div className="flex items-center justify-between ">
          <div className="shrink-0">
            <label htmlFor="dataType" className="mr-1">
              Dữ liệu:
            </label>
            <select
              id="dataType"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              className="border rounded px-2"
            >
              <option value="text">Đã quét</option>
              <option value="image">Đã dịch</option>
            </select>
          </div>
        </div>
      </div>

      {/* Radio Buttons for Time Scale Selection */}
      {/* <div className="flex items-center	 justify-between h-[5vh]">
        <div className="flex gap-1 mb-4 items-center shrink-0">
          <label>
            <input
              type="radio"
              value="day"
              checked={timeScale === 'day'}
              onChange={() => handleChangeTime('day')}
              className="mr-1"
            />
            Tuần
          </label>
          <label>
            <input
              type="radio"
              value="month"
              checked={timeScale === 'month'}
              onChange={() => handleChangeTime('month')}
              className="mr-1"
            />
            Tháng
          </label>
          <label>
            <input
              type="radio"
              value="year"
              checked={timeScale === 'year'}
              onChange={() => handleChangeTime('year')}
              className="mr-1"
            />
            Năm
          </label>
        </div>
        <div className="mb-4 shrink-0">
          <DatePickerCustom
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            setDateRange={setDateRange}
          />
        </div>
      </div> */}

      <div className="bg-gray-100 p-4 shadow-md rounded-lg ">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
          height={400}
        />
      </div>
    </div>
  );
};

export default OCRChart;

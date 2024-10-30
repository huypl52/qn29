import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DatePickerCustom from '~/component/DataPicker/DatePicker.tsx';
import {
  getStatisticalOcrHistory,
  getStatisticalOcrHistoryTranslate,
} from '~/service/task.ts';

const OCRChart = () => {
  const [timeScale, setTimeScale] = useState('day'); // Default to 'day'
  const [dataType, setDataType] = useState('text'); // Default to 'text' data
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const [x, setX] = useState<string[]>([]);
  const [y, setY] = useState<number[]>([]);
  const today = new Date();

  const fetchData = async (
    groupvalue = 0,
    from_date?: Date,
    to_date?: Date
  ) => {
    try {
      const requestParams = {
        group: groupvalue,
        from_date: from_date
          ? from_date.toLocaleDateString('en-CA')
          : undefined,
        to_date: to_date ? to_date.toLocaleDateString('en-CA') : undefined,
      };

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

      console.log('Fetched data for:', dataType);
      console.log(nameList);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
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
    const { start: rangeStart, end: rangeEnd } =
      timeScale === 'day'
        ? getWeekRange()
        : {
            start: undefined,
            end: undefined,
          };
    fetchData(
      timeScale === 'day' ? 0 : timeScale === 'month' ? 1 : 2,
      startDate ? startDate : rangeStart,
      endDate ? endDate : rangeEnd
    );
  }, [dateRange[1], dataType, timeScale]);

  const chartData = {
    labels: x,
    datasets: [
      {
        label: `Số lần sử dụng theo ${timeScale === 'day' ? 'ngày' : timeScale === 'month' ? 'tháng' : 'năm'} (${dataType === 'text' ? 'Đã quét' : 'Đã dịch'})`,
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

  const handleChangeTime = (value: any) => {
    setTimeScale(value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">
        Biểu đồ sử dụng quét và dịch ảnh
      </h2>
      {/* Radio Buttons for Time Scale Selection */}
      <div className="flex items-center	 justify-between h-[5vh]">
        <div className="flex gap-1 mb-4 items-center">
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
        <div className="mb-4">
          <DatePickerCustom
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            setDateRange={setDateRange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dataType" className="mr-1">
            Chọn kiểu dữ liệu:
          </label>
          <select
            id="dataType"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            className="border rounded p-1"
          >
            <option value="text">Đã quét</option>
            <option value="image">Đã dịch</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-100 p-4 shadow-md rounded-lg mt-4">
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

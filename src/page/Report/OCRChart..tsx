import { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useReportContext } from '~/page/Report/context';
import {
  getStatisticalOcrHistory,
  getStatisticalOcrHistoryTranslate,
} from '~/service/task.ts';
import { ETimeScale } from './type';

const OCRChart = () => {
  const [dataType, setDataType] = useState('text'); // Default to 'text' data
  const { timeScale, requestParams } = useReportContext();
  const [x, setX] = useState<string[]>([]);
  const [y, setY] = useState<number[]>([]);

  const fetchData = useCallback(async () => {
    try {
      if (!requestParams) return;
      console.log({ requestParams });
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [dataType, requestParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartData = {
    labels: x,
    datasets: [
      {
        label: `Số lần sử dụng theo ${
          timeScale === ETimeScale.day
            ? 'ngày'
            : timeScale === ETimeScale.month
            ? 'tháng'
            : 'tuần'
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
      <div className="flex justify-start gap-16 mb-4">
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

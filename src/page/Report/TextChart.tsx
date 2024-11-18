import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
// import DatePickerCustom from '~/component/DataPicker/DatePicker.tsx';
import { useReportContext } from '~/page/Report/context';
import { getStatisticalTranslateHistory } from '~/service/task.ts';
import { DLang, DLangMap } from '~/type';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TextChart = () => {
  const { timeScale, dateRange } = useReportContext();
  const [chartDataTLC, setChartDataTLC] = useState({
    datasets: [],
    labels: [],
  });

  const { requestParams } = useReportContext();

  const fetchDataTLC = useCallback(async () => {
    try {
      if (!requestParams) return;
      const res = await getStatisticalTranslateHistory(requestParams);
      const { status, data } = res;
      if (status !== 200) {
        return;
      }

      const langDataset = [
        {
          lang: DLang.zh,
          label: DLangMap[DLang.zh],
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          lang: DLang.lo,
          label: DLangMap[DLang.lo],
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          lang: DLang.km,
          label: DLangMap[DLang.km],
          data: [],
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
        },
      ];
      const labels: string[] = [];

      data.forEach((resData) => {
        labels.push(resData.name);
        langDataset.forEach((langDs) => {
          const dsKeys = Object.keys(resData).filter((n) => n !== 'name');
          if (!dsKeys.length) {
            langDs.data.push(0);
            return;
          }
          dsKeys.forEach((k) => {
            if (k.includes(langDs.lang.valueOf())) {
              langDs.data.push(resData[k]);
              return;
            }
          });
        });
      });

      const parsedData = { labels: labels, datasets: langDataset };
      console.log({ langDataset, parsedData, data });
      setChartDataTLC(parsedData);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, [requestParams]);

  useEffect(() => {
    fetchDataTLC();
  }, [dateRange, timeScale, fetchDataTLC]);

  return (
    <div className="w-full max-w-[1/2] mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">
        Biểu đồ sử dụng dịch văn bản
      </h2>
      {chartDataTLC ? (
        <div className="bg-gray-100 p-4 shadow-md rounded-lg">
          <Bar
            data={chartDataTLC}
            options={{ responsive: true, maintainAspectRatio: false }}
            height={400}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TextChart;

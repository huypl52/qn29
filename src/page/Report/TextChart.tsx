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
import { useCardContext } from '~/page/Report/context';
import { getStatisticalTranslateHistory } from '~/service/task.ts';
import { getUserRole } from '~/storage/auth';
import { useUserTreeStore } from '~/store/userTree';
import { DLang, DLangMap } from '~/type';
import { IStatisticalParam } from '~/type/task';
import { ERole } from '~/type/user';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TextChart = () => {
  // const [timeScaleTLC, setTimeScaleTLC] = useState('day'); // Default to 'day' for second chart

  const {
    timeScale: timeScaleTLC,
    setTimeScale,
    setDateRange,
    dateRange,
  } = useCardContext();
  // const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
  //   null,
  //   null,
  // ]);

  const [startDate, endDate] = dateRange;

  const [chartDataTLC, setChartDataTLC] = useState({
    datasets: [],
    labels: [],
  });

  const userRole = getUserRole();
  const isAdmin = userRole === ERole.admin ? true : false;
  const { selectedNodeId } = useUserTreeStore();

  const fetchDataTLC = useCallback(
    async (groupvalue = 0, from_date?: string, to_date?: string) => {
      let timeType = 0;
      switch (timeScaleTLC) {
        case 'day':
          timeType = 0;
          break;
        case 'month':
          timeType = 1;
          break;
        case 'year':
          timeType = 2;
          break;
      }

      try {
        const requestParams: IStatisticalParam = {
          group: groupvalue,
          from_date: from_date ? from_date : undefined,
          to_date: to_date ? to_date : undefined,
        };

        if (!isAdmin) {
          requestParams['self'] = 1;
        } else {
          if (selectedNodeId) {
            requestParams['userid'] = selectedNodeId;
          }
        }
        console.log({ TextChart: requestParams });

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
    },
    [isAdmin, selectedNodeId, timeScaleTLC]
  );

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
    console.log(firstDayOfWeek, lastDayOfWeek);

    return { start: firstDayOfWeek, end: lastDayOfWeek };
  };

  useEffect(() => {
    const { start: rangeStart, end: rangeEnd } =
      timeScaleTLC === 'day'
        ? getWeekRange()
        : {
            start: undefined,
            end: undefined,
          };

    fetchDataTLC(
      timeScaleTLC === 'day' ? 0 : timeScaleTLC === 'month' ? 1 : 2,
      startDate ? startDate : rangeStart,
      endDate ? endDate : rangeEnd
    );
    // group: nhóm dữ liệu như nào. 0 ngày trong tuần, 1 tuần trong năm, 2 tháng trong năm. Mặc định không truyền là 0
  }, [
    dateRange,
    timeScaleTLC,
    isAdmin,
    selectedNodeId,
    fetchDataTLC,
    startDate,
    endDate,
  ]);

  return (
    <div className="w-full max-w-[1/2] mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">
        Biểu đồ sử dụng dịch văn bản
      </h2>
      {/* Radio Buttons for Time Scale Selection */}
      {/* <div className="flex justify-between mb-4 h-[5vh]">
        <div className="flex gap-4 items-center">
          <label>
            <input
              type="radio"
              value="day"
              checked={timeScaleTLC === 'day'}
              onChange={() => setTimeScaleTLC('day')}
              className="mr-2"
            />
            Tuần
          </label>
          <label>
            <input
              type="radio"
              value="month"
              checked={timeScaleTLC === 'month'}
              onChange={() => setTimeScaleTLC('month')}
              className="mr-2"
            />
            Tháng
          </label>
          <label>
            <input
              type="radio"
              value="year"
              checked={timeScaleTLC === 'year'}
              onChange={() => setTimeScaleTLC('year')}
              className="mr-2"
            />
            Năm
          </label>
        </div>
        <div className="mr-6">
          <DatePickerCustom
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            setDateRange={setDateRange}
          />
        </div>
      </div> */}
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

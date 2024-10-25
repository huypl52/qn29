// import React, { useState } from 'react';
// import {Bar, Line} from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
//
// // Register chart.js modules
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
//
// const Statistical: React.FC = () => {
//     const [timeScale, setTimeScale] = useState('day'); // Default to 'day'
//     const [dataType, setDataType] = useState('text'); // Default to 'text' data
//
//     // Dummy data for each time scale (Text data example)
//     const dataByDayText = {
//         labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
//         datasets: [
//             {
//                 label: 'Số lần sử dụng theo Ngày (Văn bản)',
//                 data: [12, 19, 3, 5, 2, 3, 7],
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderWidth: 2,
//             },
//         ],
//     };
//
//     const dataByMonthText = {
//         labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
//         datasets: [
//             {
//                 label: 'Số lần sử dụng theo Tháng (Văn bản)',
//                 data: [65, 59, 80, 81, 56, 55, 40, 49, 63, 75, 54, 61],
//                 borderColor: 'rgba(153, 102, 255, 1)',
//                 backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                 borderWidth: 2,
//             },
//         ],
//     };
//
//     const dataByYearText = {
//         labels: ['2020', '2021', '2022', '2023'],
//         datasets: [
//             {
//                 label: 'Số lần sử dụng theo Năm (Văn bản)',
//                 data: [500, 600, 550, 700],
//                 borderColor: 'rgba(255, 99, 132, 1)',
//                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                 borderWidth: 2,
//             },
//         ],
//     };
//
//     // Dummy data for each time scale (Image data example)
//     const dataByDayImage = {
//         labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
//         datasets: [
//             {
//                 label: 'Số lần sử dụng theo Ngày (Hình ảnh)',
//                 data: [9, 12, 4, 6, 10, 2, 5],
//                 borderColor: 'rgba(54, 162, 235, 1)',
//                 backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                 borderWidth: 2,
//             },
//         ],
//     };
//
//     const dataByMonthImage = {
//         labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
//         datasets: [
//             {
//                 label: 'Số lần sử dụng theo Tháng (Hình ảnh)',
//                 data: [45, 69, 75, 66, 78, 70, 55, 65, 79, 55, 60, 71],
//                 borderColor: 'rgba(255, 206, 86, 1)',
//                 backgroundColor: 'rgba(255, 206, 86, 0.2)',
//                 borderWidth: 2,
//             },
//         ],
//     };
//
//     const dataByYearImage = {
//         labels: ['2020', '2021', '2022', '2023'],
//         datasets: [
//             {
//                 label: 'Số lần sử dụng theo Năm (Hình ảnh)',
//                 data: [400, 550, 520, 610],
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderWidth: 2,
//             },
//         ],
//     };
//
//     // Determine which data to show based on the selected time scale and data type
//     const chartData =
//         timeScale === 'day'
//             ? dataType === 'text'
//                 ? dataByDayText
//                 : dataByDayImage
//             : timeScale === 'month'
//                 ? dataType === 'text'
//                     ? dataByMonthText
//                     : dataByMonthImage
//                 : dataType === 'text'
//                     ? dataByYearText
//                     : dataByYearImage;
//
//     return (
//         <div className="w-full max-w-4xl mx-auto mt-4">
//             <h2 className="text-xl font-semibold mb-4">Biểu đồ tần suất sử dụng</h2>
//
//             {/* Radio Buttons for Time Scale Selection */}
//             <div className="flex justify-between">
//                 <div className="flex gap-4 mb-4">
//                     <label>
//                         <input
//                             type="radio"
//                             value="day"
//                             checked={timeScale === 'day'}
//                             onChange={() => setTimeScale('day')}
//                             className="mr-2"
//                         />
//                         Ngày
//                     </label>
//                     <label>
//                         <input
//                             type="radio"
//                             value="month"
//                             checked={timeScale === 'month'}
//                             onChange={() => setTimeScale('month')}
//                             className="mr-2"
//                         />
//                         Tháng
//                     </label>
//                     <label>
//                         <input
//                             type="radio"
//                             value="year"
//                             checked={timeScale === 'year'}
//                             onChange={() => setTimeScale('year')}
//                             className="mr-2"
//                         />
//                         Năm
//                     </label>
//                 </div>
//
//                 <div>
//                     <label htmlFor="dataType" className="mr-2">Chọn kiểu dữ liệu:</label>
//                     <select
//                         id="dataType"
//                         value={dataType}
//                         onChange={(e) => setDataType(e.target.value)}
//                         className="border rounded px-2 py-1"
//                     >
//                         <option value="text">Văn bản</option>
//                         <option value="image">Hình ảnh</option>
//                     </select>
//                 </div>
//             </div>
//
//             <div className="bg-gray-100 p-4 shadow-md rounded-lg mt-4">
//                 <Bar
//                     data={chartData}
//                     options={{
//                         responsive: true,
//                         maintainAspectRatio: false
//                     }}
//                     height={400}
//                 />
//             </div>
//         </div>
//     );
// };
//
// export default Statistical;

import React, { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import DatePickerCustom from '~/component/DataPicker/DatePicker.tsx';
import TreeView from '~/component/TreeView';

import {
  getStatisticalOcrHistory,
  getStatisticalTranslateHistory,
} from '~/service/task.ts';
import { DLang, DLangMap } from '~/type';
import { forIn } from 'lodash';
// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistical: React.FC = () => {
  const [timeScale, setTimeScale] = useState('day'); // Default to 'day'
  const [dataType, setDataType] = useState('text'); // Default to 'text' data

  const [timeScaleTLC, setTimeScaleTLC] = useState('day'); // Default to 'day' for second chart

  const [x, setX] = useState<string[]>([]);
  const [y, setY] = useState<number[]>([]);
  const fetchData = async (
    groupvalue?: number,
    from_date?: Date,
    to_date?: Date
  ) => {
    try {
      const response = await getStatisticalOcrHistory({
        group: groupvalue || 0, // Hoặc giá trị nhóm bạn muốn
        from_date: from_date
          ? from_date.toISOString().split('T')[0]
          : undefined, // Chuyển đổi ngày sang định dạng YYYY-MM-DD
        to_date: to_date ? to_date.toISOString().split('T')[0] : undefined, // Chuyển đổi ngày sang định dạng YYYY-MM-DD
      });

      const nameList = response.data.map((item) => item.name);
      const valueList = response.data.map((item) => item.ocr_converted);
      setX(() => [...nameList]); // Thêm các tên mới vào mảng
      setY(() => [...valueList]); // Thêm các giá trị mới vào mảng
      console.log(nameList); // Log tên mới
      console.log(response); // In dữ liệu nhận được từ API
    } catch (error) {
      console.error('Error fetching data:', error); // Xử lý lỗi
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getDataFromServer = (value) => {
    if (value == 'day') {
      fetchData(0);
    } else if (value == 'month') {
      fetchData(1);
    } else if (value == 'year') {
      fetchData(2);
    }
  };

  // Dummy data for each time scale (Text data example)
  const dataByDayText = {
    labels: x,
    datasets: [
      {
        label: 'Số lần sử dụng theo tuần (Văn bản)',
        data: y,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataByMonthText = {
    labels: x,
    datasets: [
      {
        label: 'Số lần sử dụng theo tháng (Văn bản)',
        data: y,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataByYearText = {
    labels: x,
    datasets: [
      {
        label: 'Số lần sử dụng theo năm (Văn bản)',
        data: y,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Dummy data for each time scale (Image data example)
  const dataByDayImage = {
    labels: x,
    datasets: [
      {
        label: 'Số lần sử dụng theo tuần (Hình ảnh)',
        data: y,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataByMonthImage = {
    labels: x,
    datasets: [
      {
        label: 'Số lần sử dụng theo tháng (Hình ảnh)',
        data: y,
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataByYearImage = {
    labels: x,
    datasets: [
      {
        label: 'Số lần sử dụng theo năm (Hình ảnh)',
        data: y,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataByDayTLC = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
    datasets: [
      {
        label: 'Số bản dịch theo tuần (T)',
        data: [8, 10, 5, 7, 9, 3, 6],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Số bản dịch theo tuần (L)',
        data: [6, 12, 4, 8, 10, 5, 7],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Số bản dịch theo tuần (C)',
        data: [9, 11, 6, 5, 12, 7, 8],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataByMonthTLC = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
    datasets: [
      {
        label: 'Số bản dịch theo tuần (T)',
        data: [8, 10, 5, 7, 9, 3, 6],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Số bản dịch theo tuần (L)',
        data: [6, 12, 4, 8, 10, 5, 7],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Số bản dịch theo tuần (C)',
        data: [9, 11, 6, 5, 12, 7, 8],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataByYearTLC = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
    datasets: [
      {
        label: 'Tiếng Trung',
        data: [8, 10, 5, 7, 9, 3, 6],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tiếng Lào',
        data: [6, 12, 4, 8, 10, 5, 7],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tiếng Khmer',
        data: [9, 11, 6, 5, 12, 7, 8],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Determine which data to show based on the selected time scale and data type
  const chartData =
    timeScale === 'day'
      ? dataType === 'text'
        ? dataByDayText
        : dataByDayImage
      : timeScale === 'month'
        ? dataType === 'text'
          ? dataByMonthText
          : dataByMonthImage
        : dataType === 'text'
          ? dataByYearText
          : dataByYearImage;

  // const chartDataTLC =
  //   timeScaleTLC === 'day'
  //     ? dataByDayTLC
  //     : timeScaleTLC === 'month'
  //       ? dataByMonthTLC
  //       : dataByYearTLC;

  const [chartDataTLC, setChartDataTLC] = useState();
  useEffect(() => {
    // group: nhóm dữ liệu như nào. 0 ngày trong tuần, 1 tuần trong năm, 2 tháng trong năm. Mặc định không truyền là 0
    let timeType = 0;
    switch (timeScaleTLC) {
      case 'day': {
        timeType = 0;
        break;
      }
      case 'month': {
        timeType = 1;
        break;
      }
      case 'year': {
        timeType = 2;
        break;
      }
    }

    getStatisticalTranslateHistory({
      group: timeType, //   from_date: new Date(),
      // to_date: new Date()
    }).then((res) => {
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
    });
  }, [timeScaleTLC]);

  const handleChangeTime = (value) => {
    getDataFromServer(value);
    setTimeScale(value);
  };

  return (
    <div className="flex">
      <TreeView />
      <div className="w-full max-w-4xl mx-auto mt-4">
        <h2 className="text-xl font-semibold mb-4">Biểu đồ tần suất sử dụng</h2>
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
            <DatePickerCustom />
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
              <option value="text">Văn bản</option>
              <option value="image">Hình ảnh</option>
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
      <div className="w-full max-w-4xl mx-auto mt-4">
        <h2 className="text-xl font-semibold mb-4">
          Biểu đồ tần suất sử dụng dịch văn bản
        </h2>

        {/* Radio Buttons for Time Scale Selection */}
        <div className="flex justify-between mb-4 h-[5vh]">
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
            <DatePickerCustom />
          </div>
        </div>

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
    </div>
  );
};

export default Statistical;


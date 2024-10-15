import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Statistical: React.FC = () => {
    const [timeScale, setTimeScale] = useState('day'); // Default to 'day'
    const [dataType, setDataType] = useState('text'); // Default to 'text' data

    // Dummy data for each time scale (Text data example)
    const dataByDayText = {
        labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
        datasets: [
            {
                label: 'Số lần sử dụng theo Ngày (Văn bản)',
                data: [12, 19, 3, 5, 2, 3, 7],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    const dataByMonthText = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Số lần sử dụng theo Tháng (Văn bản)',
                data: [65, 59, 80, 81, 56, 55, 40, 49, 63, 75, 54, 61],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    const dataByYearText = {
        labels: ['2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'Số lần sử dụng theo Năm (Văn bản)',
                data: [500, 600, 550, 700],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    // Dummy data for each time scale (Image data example)
    const dataByDayImage = {
        labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
        datasets: [
            {
                label: 'Số lần sử dụng theo Ngày (Hình ảnh)',
                data: [9, 12, 4, 6, 10, 2, 5],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    const dataByMonthImage = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Số lần sử dụng theo Tháng (Hình ảnh)',
                data: [45, 69, 75, 66, 78, 70, 55, 65, 79, 55, 60, 71],
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    const dataByYearImage = {
        labels: ['2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'Số lần sử dụng theo Năm (Hình ảnh)',
                data: [400, 550, 520, 610],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
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

    return (
        <div className="w-full max-w-4xl mx-auto mt-4">
            <h2 className="text-xl font-semibold mb-4">Biểu đồ tần suất sử dụng</h2>

            {/* Radio Buttons for Time Scale Selection */}
            <div className="flex justify-between">
                <div className="flex gap-4 mb-4">
                    <label>
                        <input
                            type="radio"
                            value="day"
                            checked={timeScale === 'day'}
                            onChange={() => setTimeScale('day')}
                            className="mr-2"
                        />
                        Ngày
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="month"
                            checked={timeScale === 'month'}
                            onChange={() => setTimeScale('month')}
                            className="mr-2"
                        />
                        Tháng
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="year"
                            checked={timeScale === 'year'}
                            onChange={() => setTimeScale('year')}
                            className="mr-2"
                        />
                        Năm
                    </label>
                </div>

                <div>
                    <label htmlFor="dataType" className="mr-2">Chọn kiểu dữ liệu:</label>
                    <select
                        id="dataType"
                        value={dataType}
                        onChange={(e) => setDataType(e.target.value)}
                        className="border rounded px-2 py-1"
                    >
                        <option value="text">Văn bản</option>
                        <option value="image">Hình ảnh</option>
                    </select>
                </div>
            </div>


            {/* Dropdown or Radio Buttons for Data Type (Text or Image) */}
            {/*<div className="flex gap-4 mb-6">*/}
            {/*    <label>*/}
            {/*        <input*/}
            {/*            type="radio"*/}
            {/*            value="text"*/}
            {/*            checked={dataType === 'text'}*/}
            {/*            onChange={() => setDataType('text')}*/}
            {/*            className="mr-2"*/}
            {/*        />*/}
            {/*        Văn bản*/}
            {/*    </label>*/}
            {/*    <label>*/}
            {/*        <input*/}
            {/*            type="radio"*/}
            {/*            value="image"*/}
            {/*            checked={dataType === 'image'}*/}
            {/*            onChange={() => setDataType('image')}*/}
            {/*            className="mr-2"*/}
            {/*        />*/}
            {/*        Hình ảnh*/}
            {/*    </label>*/}
            {/*</div>*/}

            {/* Chart.js Line Chart */}
            <div className="bg-gray-100 p-4 shadow-md rounded-lg mt-4">
                <Line data={chartData} options={{responsive: true, maintainAspectRatio: false}} height={400}/>
            </div>
        </div>
    );
};

export default Statistical;

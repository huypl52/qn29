import React, { useState } from 'react';

const DatePicker = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
      <div className="flex items-center">
        <label htmlFor="dataType" className="mr-1">Chọn khoảng ngày: </label>
        <div className="">
          <input
            type="date"
            id="start-date"
            value={startDate || "Ngày bắt đầu"}
            onChange={handleStartDateChange}
            className="border border-gray-300 rounded-md p-1 text-black"
          />
        </div>
        <div className="mx-1">-</div>
        <div className="">
          <input
            type="date"
            id="end-date"
            value={endDate || "Ngày bắt đầu"}
            onChange={handleEndDateChange}
            className="border border-gray-300 rounded-md p-1 text-black"
          />
        </div>
        {/* {startDate && endDate && ( */}
        {/*   <p className="mt-4 text-black"> */}
        {/*     Khoảng ngày đã chọn: từ {startDate} đến {endDate} */}
        {/*   </p> */}
        {/* )} */}
      </div>
  );
};


export default DatePicker;
import { vi }                         from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import DatePicker                     from 'react-datepicker';

const DatePickerCustom = () => {
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  const [startDate, endDate] = dateRange;


  useEffect(() => {
    console.log(dateRange);
  },[startDate]);

  return (
      <div className="flex items-center">
        <label htmlFor="dataType" className="mr-1">Chọn khoảng ngày: </label>
        <DatePicker
            selected={startDate}
            onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText="Chọn khoảng thời gian"
            className="px-2 py-1 border border-gray-300 rounded-md w-full"
            dateFormat="dd/MM/yyyy"
            locale={vi}
            showMonthYearDropdown
        />
        {/* {startDate && endDate && ( */}
        {/*   <p className="mt-4 text-black"> */}
        {/*     Khoảng ngày đã chọn: từ {startDate} đến {endDate} */}
        {/*   </p> */}
        {/* )} */}
      </div>
  );
};


export default DatePickerCustom;
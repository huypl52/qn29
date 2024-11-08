import { vi } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

type DatePickerCustomProps = {
  startDate?: Date;
  endDate?: Date;
  setDateRange?: (dates: [Date | null, Date | null]) => void;
};

const DatePickerCustom: React.FC<DatePickerCustomProps> = ({
  startDate,
  endDate,
  setDateRange,
}) => {
  return (
    <div className="flex items-center">
      <label htmlFor="dataType" className="mr-1">
        Khoảng ngày:
      </label>
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
    </div>
  );
};

export default DatePickerCustom;


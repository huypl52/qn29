import { useEffect, useState } from 'react';
import { useCardContext } from './context';
import { ETimeScale, timeScaleToPeriod } from './type';
import DatePickerCustom from '~/component/DataPicker/DatePicker';
import {
  IStatOcr,
  IStatOcrTranslate,
  IStatTranslateManual,
} from '~/type/statistic';
import {
  getStatOcr,
  getStatOcrTranslate,
  getStatTranslateManual,
} from '~/service/report';

const Container = () => {
  const { timeScale, setTimeScale, setDateRange, dateRange } = useCardContext();

  const [statOcr, setStatOcr] = useState<IStatOcr>();
  const [statStatOcrTran, setStatOcrTran] = useState<IStatOcrTranslate>();
  const [statStatOcrTranManual, setStatOcrTranManual] =
    useState<IStatTranslateManual>();

  useEffect(() => {
    const period = timeScaleToPeriod(timeScale);
    const [from_date, to_date] = dateRange.map((v) =>
      v?.toLocaleDateString('en-CA')
    );
    getStatOcr({ from_date, to_date, period }).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        setStatOcr(data);
      }
    });
    getStatOcrTranslate({ from_date, to_date, period }).then((res) => {
      const { status, data } = res;

      if (status === 200) {
        setStatOcrTran(data);
      }
    });
    getStatTranslateManual({ from_date, to_date, period }).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        setStatOcrTranManual(data);
      }
    });
  }, [timeScale, dateRange]);

  // console.log({ dateRange, statOcr, statStatOcrTran, statStatOcrTranManual });
  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">Thống kê sử dụng</h2>
      <div className="flex gap-1 mb-4 items-center">
        <label>
          <input
            type="radio"
            value="day"
            checked={timeScale === ETimeScale.day}
            onChange={() => setTimeScale(ETimeScale.day)}
            className="mr-1"
          />
          Tuần
        </label>
        <label>
          <input
            type="radio"
            value="month"
            checked={timeScale === ETimeScale.month}
            onChange={() => setTimeScale(ETimeScale.month)}
            className="mr-1"
          />
          Tháng
        </label>
        <label>
          <input
            type="radio"
            value="year"
            checked={timeScale === ETimeScale.year}
            onChange={() => setTimeScale(ETimeScale.year)}
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
    </div>
  );
};

export { Container };

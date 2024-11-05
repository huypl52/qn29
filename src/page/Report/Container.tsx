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
import { Card, CardItem } from './Card';

const OcrStat = () => {
  const { timeScale, dateRange } = useCardContext();
  const [from_date, to_date] = dateRange;
  const [statOcr, setStatOcr] = useState<IStatOcr>();
  const period = timeScaleToPeriod(timeScale);

  useEffect(() => {
    getStatOcr({ from_date, to_date, period }).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        setStatOcr(data);
      }
    });
  }, [period, dateRange]);

  return (
    <Card title="Số ảnh tải lên: " value={statOcr?.ocr_uploaded}>
      <CardItem
        title="Đã chuyển đổi: "
        value={statOcr?.ocr_converted}
      ></CardItem>
      <CardItem
        title="Đang chuyển đổi: "
        value={statOcr?.ocr_converted}
      ></CardItem>
      <CardItem title="Thất bại: " value={statOcr?.ocr_failed}></CardItem>
    </Card>
  );
};

const OcrTranslate = () => {
  const { timeScale, dateRange } = useCardContext();
  const [from_date, to_date] = dateRange;
  const [statOcrTranslate, setStatOcrTranslate] = useState<IStatOcrTranslate>();
  const period = timeScaleToPeriod(timeScale);

  useEffect(() => {
    getStatOcrTranslate({ from_date, to_date, period }).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        setStatOcrTranslate(data);
      }
    });
  }, [period, dateRange]);

  return (
    <Card
      title="Văn bản chuyển đổi từ ảnh: "
      value={statOcrTranslate?.ocr_detected}
    >
      <CardItem
        title="Đã dịch: "
        value={statOcrTranslate?.ocr_translated}
      ></CardItem>
      <CardItem
        title="Chưa dịch: "
        value={statOcrTranslate?.ocr_untranslated}
      ></CardItem>
    </Card>
  );
};

const OcrTranManualStat = () => {
  const { timeScale, setTimeScale, setDateRange, dateRange } = useCardContext();

  const period = timeScaleToPeriod(timeScale);
  const [from_date, to_date] = dateRange;
  const [statOcrTranManual, setStatOcrTranManual] =
    useState<IStatTranslateManual>();
  useEffect(() => {
    getStatTranslateManual({ from_date, to_date, period }).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        setStatOcrTranManual(data);
      }
    });
  }, [timeScale, dateRange]);

  return <div></div>;
};

const Container = () => {
  const { timeScale, setTimeScale, setDateRange, dateRange } = useCardContext();

  // console.log({ dateRange, statOcr, statStatOcrTran, statStatOcrTranManual });
  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">Thống kê sử dụng</h2>
      <div className="flex gap-1 mb-4 items-center min-h-10">
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

        {timeScale !== ETimeScale.day && (
          <div className="grow flex flex-row-reverse">
            <DatePickerCustom
              startDate={dateRange[0] && new Date(dateRange[0])}
              endDate={dateRange[1] && new Date(dateRange[1])}
              setDateRange={setDateRange}
            />
          </div>
        )}
      </div>

      <div className="flex justify-center gap-x-9 ">
        <OcrStat />
        <OcrTranslate />
      </div>
    </div>
  );
};

export { Container };

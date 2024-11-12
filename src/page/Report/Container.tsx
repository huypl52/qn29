import { useEffect, useState } from 'react';
import { useCardContext } from './context';
import { ETimeScale, timeScaleToPeriod } from './type';
import DatePickerCustom from '~/component/DataPicker/DatePicker';
import {
  IStatOcr,
  IStatOcrTranslate,
  IStatParam,
  IStatTranslateManual,
} from '~/type/statistic';
import {
  exportReport,
  getStatOcr,
  getStatOcrTranslate,
  getStatTranslateManual,
} from '~/service/report';
import { Card, CardItem } from './Card';
import { useUserTreeStore } from '~/store/userTree';
import { getUserRole } from '~/storage/auth';
import { ERole } from '~/type/user';
import { TbFileExport } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { toastMsg } from '~/type';
const OcrStat = () => {
  const { timeScale, dateRange } = useCardContext();
  const [from_date, to_date] = dateRange;
  const [statOcr, setStatOcr] = useState<IStatOcr>();
  const period = timeScaleToPeriod(timeScale);

  const { selectedNodeId } = useUserTreeStore();
  const userRole = getUserRole();
  const isAdmin = userRole === ERole.admin ? true : false;

  useEffect(() => {
    const param: IStatParam = { from_date, to_date, period };
    if (!isAdmin) {
      param['self'] = 1;
    } else {
      if (selectedNodeId) {
        param['userid'] = selectedNodeId;
      }
    }

    getStatOcr(param).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        setStatOcr(data);
      }
    });
  }, [period, dateRange, selectedNodeId, isAdmin]);

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

  const { selectedNodeId } = useUserTreeStore();
  const userRole = getUserRole();
  const isAdmin = userRole === ERole.admin ? true : false;

  useEffect(() => {
    const param: IStatParam = { from_date, to_date, period };

    if (!isAdmin) {
      param['self'] = 1;
    } else {
      if (selectedNodeId) {
        param['userid'] = selectedNodeId;
      }
    }

    getStatOcrTranslate(param).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        setStatOcrTranslate(data);
      }
    });
  }, [period, dateRange, selectedNodeId, isAdmin]);

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

  const handleExport = () => {
    const [from_date, to_date] = dateRange;
    exportReport(from_date, to_date)
      .then()
      .catch((err) => {
        toast.error(err?.data ? err.data : toastMsg.error);
      });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-semibold ">Thống kê sử dụng</h2>
        <button
          className="hover:bg-gray-300 rounded-full w-10 h-10 mt-1 transition-colors duration-100 text-gray-500 p-1 flex items-center justify-center"
          title="Clear"
          onClick={handleExport}
        >
          <TbFileExport title="Xuất báo cáo" size={24} />
        </button>
      </div>
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

      <div className="flex justify-evenly gap-x-9 ">
        <OcrStat />
        <OcrTranslate />
      </div>
    </div>
  );
};

export { Container };

import { useEffect, useState } from 'react';
import { TbFileExport } from 'react-icons/tb';
import { toast } from 'react-toastify';
import DatePickerCustom from '~/component/DataPicker/DatePicker';
import {
  exportReport,
  getStatOcr,
  getStatTranslateManual,
} from '~/service/report';
import { DLangMap, toastMsg } from '~/type';
import { IStatOcr, IStatTranslateManual } from '~/type/statistic';
import { Card, CardItem } from './Card';
import { useReportContext } from './context';
import { ETimeScale } from './type';

const OcrStat = () => {
  const [statOcr, setStatOcr] = useState<IStatOcr>();
  const { requestParams } = useReportContext();

  useEffect(() => {
    if (!requestParams) return;

    getStatOcr(requestParams).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        setStatOcr(data);
      }
    });
  }, [requestParams]);

  return (
    <Card title="Số ảnh tải lên: " value={statOcr?.ocr_uploaded}>
      <CardItem
        title="Đã chuyển đổi: "
        value={statOcr?.ocr_converted}
      ></CardItem>
      <CardItem
        title="Đang chuyển đổi: "
        value={statOcr?.ocr_converting}
      ></CardItem>

      <CardItem
        title="Chuyển đổi thất bại: "
        value={statOcr?.ocr_failed}
      ></CardItem>
      <CardItem title="Đã dịch: " value={statOcr?.ocr_translated}></CardItem>
      <CardItem title="Đang dịch: " value={statOcr?.ocr_translating}></CardItem>
      <CardItem
        title="Dịch thất bại: "
        value={statOcr?.ocr_translate_error}
      ></CardItem>
    </Card>
  );
};

const OcrTranslate = () => {
  const { requestParams } = useReportContext();
  const [statOcrTranslate, setStatOcrTranslate] =
    useState<IStatTranslateManual>();

  useEffect(() => {
    if (!requestParams) return;
    getStatTranslateManual(requestParams).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        setStatOcrTranslate(data);
      }
    });
  }, [requestParams]);

  const availableLang = Object.keys(DLangMap);

  return (
    <Card
      title="Dịch thủ công: "
      value={statOcrTranslate?.reduce(
        (acc, item) =>
          availableLang.includes(item.source_language) ? acc + item.count : acc,
        0
      )}
    >
      {statOcrTranslate?.map((item) => (
        <CardItem
          title={`${DLangMap[item.source_language]} đã dịch: `}
          value={item.count}
        ></CardItem>
      ))}
    </Card>
  );
};

const Container = () => {
  const { timeScale, setTimeScale, setDateRange, dateRange } =
    useReportContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleExport = () => {
    const [from_date, to_date] = dateRange;
    // if (!from_date || !to_date) return;
    exportReport(from_date, to_date)
      .then()
      .catch((err) => {
        toast.error(err?.data ? err.data : toastMsg.error);
      });
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto mt-4">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-2xl font-semibold">Thống kê sử dụng</h2>
          <div className="flex justify-end items-center gap-2 relative">
            <button
              className="hover:bg-gray-300 rounded-full w-10 h-10 mt-1 transition-colors duration-100 text-gray-500 p-1 flex items-center justify-center"
              title="Xuất báo cáo"
              onClick={() => {
                setShowDropdown(true);
                handleExport();
              }}
            >
              <TbFileExport size={24} />
            </button>
            {showDropdown && (
              <div className="absolute top-12 right-0 w-24 bg-white shadow-lg rounded-md p-3 z-10">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="exportLang"
                      className="mr-2"
                      value="zh"
                      onChange={() => setShowDropdown(false)}
                    />
                    {DLangMap.zh}
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="exportLang"
                      className="mr-2"
                      value="lo"
                      onChange={() => setShowDropdown(false)}
                    />
                    {DLangMap.lo}
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="exportLang"
                      className="mr-2"
                      value="km"
                      onChange={() => setShowDropdown(false)}
                    />
                    {DLangMap.km}
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        <DatePickerCustom
          // readonly={timeScale === ETimeScale.day}
          startDate={dateRange[0] && new Date(dateRange[0])}
          endDate={dateRange[1] && new Date(dateRange[1])}
          setDateRange={setDateRange}
        />

        <div className="flex justify-evenly gap-x-9 ">
          <OcrStat />
          <OcrTranslate />
        </div>
      </div>

      <div className="w-full h-1 border-b border-gray-200 my-16"></div>
      <div className="grow flex justify-center mt-4">
        <div className="flex gap-6 mb-4 items-center min-h-10">
          <label>
            <input
              type="radio"
              value={ETimeScale.day}
              checked={timeScale === ETimeScale.day}
              onChange={() => setTimeScale(ETimeScale.day)}
              className="mr-1"
            />
            Ngày
          </label>
          <label>
            <input
              type="radio"
              value={ETimeScale.week}
              checked={timeScale === ETimeScale.week}
              onChange={() => setTimeScale(ETimeScale.week)}
              className="mr-1"
            />
            Tuần
          </label>
          <label>
            <input
              type="radio"
              value={ETimeScale.month}
              checked={timeScale === ETimeScale.month}
              onChange={() => setTimeScale(ETimeScale.month)}
              className="mr-1"
            />
            Tháng
          </label>
        </div>
      </div>
    </div>
  );
};

export { Container };


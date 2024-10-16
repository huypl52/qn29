import LangBar from '../languageSelect/LangBar';
import SourceTextBox from './SourceTextBox';
import TargetTextBox from './TargetTextBox';

const Container = () => {
  return (
    <div className="w-full h-full">
      <LangBar />
      <div className="flex gap-2">
        <SourceTextBox />
        <TargetTextBox />
      </div>
      <div className="flex justify-center space-x-12 mt-4">
        <button className="flex flex-col items-center w-48 text-gray-700">
          <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            ↻
          </span>
          <span className="text-xs mt-1">Các bản dịch đã thực hiện</span>
        </button>
        <button className="flex flex-col items-center w-48 text-gray-700">
          <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            ★
          </span>
          <span className="text-xs mt-1">Đã lưu</span>
        </button>
      </div>
    </div>
  );
};

export default Container;

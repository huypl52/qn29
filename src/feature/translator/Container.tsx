import LangBar from '../languageSelect/LangBar';
import SourceTextBox from './SourceTextBox';
import TargetTextBox from './TargetTextBox';
import React from 'react';
import History from '~/component/LeftBar/History';

const Container: React.FC<{
  updateViewHistory: (status: boolean) => void;
  updateSavedText: (status: boolean) => void;
}> = ({ updateViewHistory, updateSavedText }) => {
  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full mx-auto">
        <LangBar />
        <div className="flex gap-2 max-w-screen-xl mx-auto">
          <SourceTextBox />
          <TargetTextBox />
        </div>
        <div className="flex justify-center space-x-12 mt-4">
          <button
            className="flex flex-col items-center w-48 text-gray-700"
            onClick={() => updateViewHistory(true)}
          >
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              ↻
            </span>
            <span className="text-xs mt-1">Các bản dịch đã thực hiện</span>
          </button>
          <button
            className="flex flex-col items-center w-48 text-gray-700"
            onClick={() => updateSavedText(true)}
          >
            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              ★
            </span>
            <span className="text-xs mt-1">Đã lưu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Container;

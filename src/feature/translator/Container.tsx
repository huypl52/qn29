import LangBar from '../languageSelect/LangBar';
import { TranslatorContextProvider } from './context';
import SourceTextBox from './SourceTextBox';
import TargetTextBox from './TargetTextBox';
import React from 'react';
import HistoryTranslate from "~/component/LeftBar/HistoryTranslate.tsx";

const Container: React.FC<{ updateViewHistory: (status: boolean) => void }> = ({ updateViewHistory }) =>
{

  return (
    <TranslatorContextProvider>
      <div className="w-full h-full flex">
        <div className="w-full h-full mx-auto">
          <LangBar />
          <div className="flex gap-2 max-w-screen-xl mx-auto">
            <SourceTextBox />
            <TargetTextBox />
          </div>
          <div className="flex justify-center space-x-12 mt-4">
            <button className="flex flex-col items-center w-48 text-gray-700"
            onClick={()=>updateViewHistory(true)}>
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

      </div>

    </TranslatorContextProvider>
  );
};

export default Container;

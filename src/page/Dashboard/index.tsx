import React from 'react';
import History from '~/component/LeftBar/History';
import ResizableFlex from '~/component/ResizableFlex';
import { TabWithContent } from '~/component/Tab/TabWithContent';
import { LangContextProvider } from '~/feature/languageSelect/context';
import Ocr from '~/feature/ocr';
import Translator from '~/feature/translator';
import { useTaskStore } from '~/store/task';
import { ETaskType } from '~/type/task';
import Audio from '~/feature/AudioToText'

const Dashboard = () => {
  const [viewHistory, setViewHistory] = React.useState(false);

  const updateViewHistory = (status: boolean) => {
    setViewHistory(status);
  };

  const { changeTaskType } = useTaskStore();

  const tabs = [
    {
      id: '1',
      label: 'Dịch văn bản',
      content: <Translator />,
    },
    {
      id: '2',
      label: 'Quét và dịch ảnh',
      content: <Ocr />,
    },
    {
      id: '3',
      label: 'Dịch đoạn hội thoại tiếng Trung',
      content: <Audio />,
    },
  ];

  return (
    <ResizableFlex
      leftContent={
        <LangContextProvider>
          <div className="flex justify-between w-full">
            <TabWithContent
              tabs={tabs}
              showHistory={viewHistory}
              onClickHistory={updateViewHistory}
              onTabChange={(id) => {
                updateViewHistory(false);
                switch (id) {
                  case '1':
                    changeTaskType(ETaskType.TRANSLATE);
                    break;
                  case '2':
                    changeTaskType(ETaskType.OCR);
                    break;
                }
              }}
            />
          </div>
        </LangContextProvider>
      }
      rightContent={
        viewHistory ? <History updateViewHistory={updateViewHistory} /> : null
      }
    />
  );
};

export default Dashboard;

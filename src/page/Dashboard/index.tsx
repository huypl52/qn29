import { TabWithContent } from '~/component/Tab/TabWithContent';
import { LangContextProvider } from '~/feature/languageSelect/context';
import Ocr from '~/feature/ocr';
import Translator from '~/feature/translator';
import React from 'react';
import History from '~/component/LeftBar/History';
import HistoryImageOcr from '~/component/LeftBar/HistoryImageOcr.tsx';
import SavedText from '~/component/LeftBar/SavedText.tsx';
import SavedImage from '~/component/LeftBar/SavedImage.tsx';

const Dashboard = () => {
  const [viewHistory, setViewHistory] = React.useState(false);
  const [viewHistoryImage, setViewHistoryImage] = React.useState(false);
  const [viewSaved, setViewSaved] = React.useState(false);
  const [savedImage, setSavedImage] = React.useState(false);

  const updateViewHistory = (status: boolean) => {
    setViewHistory(status);
  };
  const updateViewHistoryImage = (status: boolean) => {
    setViewHistoryImage(status);
  };

  const updateSavedItem = (status: boolean) => {
    setViewSaved(status);
  };

  const updateSavedImage = (status: boolean) => {
    setSavedImage(status);
  };

  const tabs = [
    {
      id: '1',
      label: 'Dịch văn bản',
      content: (
        <Translator
          updateViewHistory={updateViewHistory}
          updateSavedText={updateSavedItem}
        />
      ),
    },
    {
      id: '2',
      label: 'Quét và dịch ảnh',
      content: (
        <Ocr
          updateViewHistory={updateViewHistory}
          updateSavedText={updateSavedImage}
        />
      ),
    },
  ];

  return (
    <div className="flex">
      <LangContextProvider>
        <TabWithContent
          tabs={tabs}
          onTabChange={() => updateViewHistory(false)}
        />
      </LangContextProvider>
      {viewHistory && <History updateViewHistory={updateViewHistory} />}
      {/* {viewHistoryImage && <HistoryImageOcr updateViewHistory={updateViewHistoryImage}/>} */}
      {/* {viewSaved && <SavedText  updateViewHistory={updateSavedItem}/>} */}
      {/* {savedImage && <SavedImage updateViewHistory={updateSavedImage}/>} */}
    </div>
  );
};

export default Dashboard;

import { TabWithContent } from '~/component/Tab/TabWithContent';
import { LangContextProvider } from '~/feature/languageSelect/context';
import Ocr from '~/feature/ocr';
import Translator from '~/feature/translator';
import React from "react";
import HistoryTranslate from "~/component/LeftBar/HistoryTranslate.tsx";
import HistoryImageOcr from "~/component/LeftBar/HistoryImageOcr.tsx";

const Dashboard = () => {

    const [viewHistory, setViewHistory] = React.useState(false);
    const [viewHistoryImage, setViewHistoryImage] = React.useState(false);

    const updateViewHistory = (status:boolean) =>{
        setViewHistory(status);
    };
    const updateViewHistoryImage = (status:boolean) =>{
        setViewHistoryImage(status);
    };
    const tabs = [
        { id: '1', label: 'Dịch văn bản', content: <Translator updateViewHistory={updateViewHistory}/> },
        { id: '2', label: 'Quét và dịch ảnh', content: <Ocr updateViewHistory={updateViewHistoryImage}/> },
    ];


    return (
    <div className="flex">
      <LangContextProvider>
        <TabWithContent tabs={tabs} onTabChange={()=>updateViewHistory(false)} />
      </LangContextProvider>
        {viewHistory && <HistoryTranslate updateViewHistory={updateViewHistory}/>}
        {viewHistoryImage && <HistoryImageOcr updateViewHistory={updateViewHistoryImage}/>}

    </div>
  );
};

export default Dashboard;

import { TabWithContent } from "~/component/Tab/TabWithContent";
import { LangContextProvider } from "~/feature/languageSelect/context";
import Ocr from "~/feature/ocr";
import Translator from "~/feature/translator";

const tabs = [
  { id: "1", label: "Dịch văn bản", content: <Translator /> },
  { id: "2", label: "Quét và dịch ảnh", content: <Ocr /> },
];

const Dashboard = () => {
  return (
    <div>
      <LangContextProvider>
        <TabWithContent tabs={tabs} />
      </LangContextProvider>
    </div>
  );
};

export default Dashboard;

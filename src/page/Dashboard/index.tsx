import Tabs from "~/component/Tab";
import Ocr from "~/feature/ocr";
import Translator from "~/feature/translator";

const tabs = [
  { id: "1", label: "Dịch máy", content: <Translator /> },
  { id: "2", label: "OCR", content: <Ocr /> },
];

const Dashboard = () => {
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Dashboard;

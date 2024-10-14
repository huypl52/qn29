import LangBar from "../languageSelect/LangBar";
import { TranslatorContextProvider } from "./context";
import SourceTextBox from "./SourceTextBox";
import TargetTextBox from "./TargetTextBox";

const Container = () => {
  return (
    <TranslatorContextProvider>
      <div className="w-full h-full">
        <LangBar/>
        <div className="flex gap-2">
          <SourceTextBox />
          <TargetTextBox />
        </div>
      </div>
    </TranslatorContextProvider>
  );
};

export default Container;

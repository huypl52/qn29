import { TranslatorContextProvider } from "./context";
import LangBar from "./LangBar";
import SourceTextBox from "./SourceTextBox";
import TargetTextBox from "./TargetTextBox";

const Container = () => {
  return (
    <TranslatorContextProvider>
      <div className="w-full h-full max-w-screen-2xl mx-auto">
        <LangBar />
        <div className="flex">
          <SourceTextBox />
          <TargetTextBox />
        </div>
      </div>
    </TranslatorContextProvider>
  );
};

export default Container;

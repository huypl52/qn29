import { StructureTextarea } from "~/component/Textarea";
import { useTranslatorContext } from "./context";

const TextBoxFooter = () => {
  const { srcText, maxInputLeng } = useTranslatorContext();
  return (
    <div className="text-gray-400 h-10 flex items-center ">
      {`${srcText?.length || 0}/${maxInputLeng}`}
    </div>
  );
};

const SourceTextBox = () => {
  const { srcText, updateSrcText } = useTranslatorContext();
  return (
    <div className="w-full">
      <StructureTextarea
        resizable={false}
        value={srcText}
        onChange={updateSrcText}
        footer={TextBoxFooter}
        showClear
      />
    </div>
  );
};

export default SourceTextBox;

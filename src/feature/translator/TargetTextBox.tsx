import { StructureTextarea } from "../../component/Textarea";
import { FaRegCopy } from "react-icons/fa";
import { useTranslatorContext } from "./context";
import { toast } from "react-toastify";
import { EStatus } from "./type";

const TargetBoxFooter = () => {
  const { targetText } = useTranslatorContext();
  const onCopyClick = () => {
    if (!targetText) return;
    navigator.clipboard.writeText(targetText);
    toast.success("Text is copied to clipboard");
  };
  return (
    <div className="text-gray-400 h-10 flex items-center" onClick={onCopyClick}>
      <FaRegCopy />
    </div>
  );
};
const TargetTextBox = () => {
  const { targetText, status } = useTranslatorContext();

  const value = status === EStatus.waiting ? "Đang thực hiện..." : targetText;
  return (
    <div className="w-full">
      <StructureTextarea
        resizable={false}
        footer={TargetBoxFooter}
        disabled
        value={value}
      />
    </div>
  );
};

export default TargetTextBox;

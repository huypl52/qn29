import { StructureTextarea } from "../../component/Textarea";
import { FaRegCopy } from "react-icons/fa";
import { useTranslatorContext } from "./context";
import { toast } from "react-toastify";
import { EStatus } from "./type";
import { useEffect, useState } from "react";
import { stat } from "fs";

const DynamicDots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      Đang thực hiện{dots}
      <span className="invisible">...</span>
    </div>
  );
};
const TargetBoxFooter = () => {
  const { targetText } = useTranslatorContext();
  const onCopyClick = () => {
    if (!targetText) return;
    navigator.clipboard.writeText(targetText);
    toast.success("Text is copied to clipboard");
  };
  return (
    <div
      className="text-gray-400 h-10 flex items-center cursor-pointer"
      onClick={onCopyClick}
    >
      <FaRegCopy />
    </div>
  );
};

const TargetTextBox = () => {
  const { targetText, status } = useTranslatorContext();

  const [loading, setLoading] = useState(status === EStatus.sending);

  useEffect(() => {
    setLoading(status === EStatus.sending);
  }, [status]);

  return (
    <div className="w-full">
      <StructureTextarea
        resizable={false}
        footer={TargetBoxFooter}
        disabled
        value={targetText}
        loading={loading}
        text={"Bản dịch"}
      />
    </div>
  );
};

export default TargetTextBox;

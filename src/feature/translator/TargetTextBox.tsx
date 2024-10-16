import { StructureTextarea } from '../../component/Textarea';
import { FaRegCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { EStatus } from './type';
import { useEffect, useState } from 'react';
import { stat } from 'fs';
import { useTranslateStore } from '~/store/translate';

const DynamicDots = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
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
  const { targetText } = useTranslateStore();
  const onCopyClick = () => {
    if (!targetText) return;
    navigator.clipboard.writeText(targetText);
    toast.success('Text is copied to clipboard');
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
  const { targetText, status } = useTranslateStore();

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
        text={'Bản dịch'}
      />
    </div>
  );
};

export default TargetTextBox;

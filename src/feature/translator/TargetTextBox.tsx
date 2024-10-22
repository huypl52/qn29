import { StructureTextarea } from '../../component/Textarea';
import { FaRegCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { EStatus } from './type';
import { useEffect, useState } from 'react';
import { IoSaveOutline } from 'react-icons/io5';
import { useTranslateStore } from '~/store/translate';
import { FaRegSave } from 'react-icons/fa';

const TargetBoxFooter = () => {
  const { targetText } = useTranslateStore();
  const onCopyClick = () => {
    if (!targetText) return;
    navigator.clipboard.writeText(targetText);
    toast.success('Text is copied to clipboard');
  };
  return (
    <div className="text-gray-600 h-10 flex gap-4 px-3 items-center ">
      <div onClick={onCopyClick} className="cursor-pointer">
        <FaRegCopy size={24} />
      </div>
      {targetText ? (
        <div onClick={onCopyClick} className="cursor-pointer">
          <FaRegSave size={24} />
        </div>
      ) : null}
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
    <div className="w-full relative">
      <StructureTextarea
        resizable={false}
        footer={TargetBoxFooter}
        disabled
        value={targetText}
        loading={loading}
        text={'Bản dịch'}
        rows={15}
      />
    </div>
  );
};

export default TargetTextBox;

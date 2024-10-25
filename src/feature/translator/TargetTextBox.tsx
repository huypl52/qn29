import { StructureTextarea } from '../../component/Textarea';
import { FaRegCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { EStatus } from './type';
import { useEffect, useState } from 'react';
import { useTranslateStore } from '~/store/translate';
import { FaRegSave } from 'react-icons/fa';
import { saveTranslation } from '~/service/translate';
import {
  ISavedTranslation,
  ITranslation,
  ITranslationResult,
} from '~/type/translate';
import { toastMsg } from '~/type';

const TargetBoxFooter = () => {
  const { targetText, srcText, srcLang, targetLang } = useTranslateStore();
  const onCopyClick = () => {
    if (!targetText) return;
    navigator.clipboard.writeText(targetText);
    toast.success('Text is copied to clipboard');
  };

  const onSaveClick = () => {
    const result = {
      source_text: srcText,
      source_language: srcLang,
      dest_text: targetText,
      dest_language: targetLang,
    } as ITranslation;
    saveTranslation(result)
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          toast.success(toastMsg.success);
          return;
        }
        throw { data: toastMsg.error };
      })
      .catch((err) => {
        err?.data ? err.data : toastMsg.error;
      });
  };

  return (
    <div className="text-gray-600 h-10 flex gap-4 px-3 items-center ">
      <div onClick={onCopyClick} className="cursor-pointer">
        <FaRegCopy size={24} />
      </div>
      {targetText ? (
        <div onClick={onSaveClick} className="cursor-pointer">
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
        text={'Bản dịch tiếng Việt'}
        rows={15}
      />
    </div>
  );
};

export default TargetTextBox;

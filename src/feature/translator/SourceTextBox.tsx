import { StructureTextarea } from '~/component/Textarea';
import { useEffect, useState } from 'react';
import { EStatus } from './type';
import { translate } from '~/service/translate';
import { ITranslation } from '~/type/translate';
import { toastMsg } from '~/type';
import { toast } from 'react-toastify';
import { useTranslateStore } from '~/store/translate';

const TextBoxFooter = () => {
  const { srcText, maxInputLeng } = useTranslateStore();
  return (
    <div className="text-gray-400 h-10 flex items-center ">
      {`${srcText?.length || 0}/${maxInputLeng}`}
    </div>
  );
};

const TIMEOUT_DURATION = 500;
const SourceTextBox = () => {
  const { srcText, updateSrcText, setStatus, updateTargetText } =
    useTranslateStore();

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = (text: string) => {
    updateSrcText(text);
    if (!text) {
      setStatus(EStatus.idle);
      updateTargetText('');
      return;
    }

    setStatus(EStatus.waiting);

    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    const newTimeoutId = setTimeout(async () => {
      setStatus(EStatus.sending);
      // updateTargetText("");
      try {
        const res = await translate({ source_text: text } as ITranslation).then(
          (res) => {
            const { status, data } = res;
            if (status === 200) {
              return data;
            }
          }
        );
        if (res) {
          const { translation } = res;

          updateTargetText(translation);
        }
        setStatus(EStatus.idle);
      } catch (error) {
        console.error('API call failed:', error);
        updateTargetText('');
        setStatus(EStatus.idle);
        toast.error(toastMsg.error);
      }
    }, TIMEOUT_DURATION);

    setTimeoutId(newTimeoutId);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className="w-full bg-white rounded-lg ">
      <StructureTextarea
        resizable={false}
        value={srcText}
        onChange={handleInputChange}
        footer={TextBoxFooter}
        showClear
        text={'Nhập văn bản ...'}
        rows={15}
      />
    </div>
  );
};

export default SourceTextBox;

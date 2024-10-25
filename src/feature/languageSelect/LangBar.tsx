import { useCallback } from 'react';
import { ColorButton } from '~/component/Button';
import { DLang, DLangMap } from '~/type';
import { useTranslateStore } from '~/store/translate';


interface LangBarProps {
  updateSrc: (newText: string) => void;
}


const LangBar: React.FC<LangBarProps> = ({ updateSrc }) => {
  const {
    updateSrcLang: setSourceLang,
    updateTargetLang: setTargetLang,
    srcLang: sourceLang,
    srcText: srcText,
    updateSrcText,
    updateTargetText,
    targetLang,
  } = useTranslateStore();

  const updateSrcLang = useCallback(
    (key: DLang) => {
      setSourceLang(key);
      updateSrcText('');
      updateTargetText('')
    },
    [setSourceLang]
  );

  const updateTargetLang = useCallback(
    (key: DLang) => {
      setTargetLang(key);
    },
    [setTargetLang]
  );

  return (
    <div className="flex h-full justify-between mt-2 gap-2 mx-12">
      <div className="flex w-full gap-2 ">
        <ColorButton
          active={sourceLang === DLang.zh}
          onClick={updateSrcLang.bind(null, DLang.zh)}
        >
          {DLangMap[DLang.zh]}
        </ColorButton>
        <ColorButton
          active={sourceLang === DLang.lo}
          onClick={updateSrcLang.bind(null, DLang.lo)}
        >
          {DLangMap[DLang.lo]}
        </ColorButton>
        <ColorButton
          active={sourceLang === DLang.km}
          onClick={updateSrcLang.bind(null, DLang.km)}
        >
          {DLangMap[DLang.km]}
        </ColorButton>
      </div>
      <div className="flex flex-row-reverse w-full gap-2 ml-2">
        {/* <IoMdSwap size={24} /> */}
        {/* <ColorButton */}
        {/*   active={targetLang === DLang.vi} */}
        {/*   onClick={updateTargetLang.bind(null, DLang.vi)} */}
        {/* > */}
        {/*   {DLangMap[DLang.vi]} */}
        {/* </ColorButton> */}
      </div>
    </div>
  );
};

export default LangBar;

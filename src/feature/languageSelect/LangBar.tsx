import { useCallback } from "react";
import { ColorButton } from "~/component/Button";
import { DLang, DLangMap } from "~/type";
import { useLangContext } from "./context";
import { IoMdSwap } from "react-icons/io";
const LangBar = () => {
  const {
    updateSourceLang: setSourceLang,
    updateTargetLang: setTargetLang,
    sourceLang,
    targetLang,
  } = useLangContext();

  const updateSrcLang = useCallback(
    (key: DLang) => {
      setSourceLang(key);
    },
    [setSourceLang],
  );

  const updateTargetLang = useCallback(
    (key: DLang) => {
      setTargetLang(key);
    },
    [setTargetLang],
  );

  return (
    <div className="flex w-full h-full justify-evenly my-2 gap-2">
      <div className="flex w-full gap-2">
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
      <div className="flex w-full gap-2">
        {/* <IoMdSwap size={24} /> */}
        <ColorButton
          active={targetLang === DLang.vi}
          onClick={updateTargetLang.bind(null, DLang.vi)}
        >
          {DLangMap[DLang.vi]}
        </ColorButton>
      </div>
    </div>
  );
};

export default LangBar;

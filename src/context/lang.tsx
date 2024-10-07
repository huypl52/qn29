import { createContext, PropsWithChildren, useContext, useState } from "react";
import { DLang } from "~/type";
import { ILangContext } from "~/type/ctxLang";

const LangContext = createContext<ILangContext>({
  sourceLang: DLang.cn,
  targetLang: DLang.vi,
  setSourceLang: () => {},
  setTargetLang: () => {},
});

const LangContextProvider = ({ children }: PropsWithChildren) => {
  const [sourceLang, setSourceLang] = useState(DLang.cn);
  const [targetLang, setTargetLang] = useState(DLang.vi);

  return (
    <LangContext.Provider
      value={{
        sourceLang,
        targetLang,
        setSourceLang,
        setTargetLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

const useLangContext = () => {
  return useContext<ILangContext>(LangContext);
};

export { LangContextProvider, useLangContext };

import { createContext, useContext, useState } from "react";
import { DLang } from "~/type";
import { ILangContext } from "~/type/ctxLang";

export const LangContext = createContext<ILangContext>({
  sourceLang: DLang.zh,
  targetLang: DLang.vi,

  updateSourceLang: () => {},
  updateTargetLang: () => {},
});

export const LangContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sourceLang, setSourceLang] = useState(DLang.zh);
  const [targetLang, setTargetLang] = useState(DLang.vi);
  return (
    <LangContext.Provider
      value={{
        sourceLang,
        updateSourceLang: setSourceLang,
        targetLang,
        updateTargetLang: setTargetLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

export const useLangContext = () => {
  return useContext(LangContext);
};

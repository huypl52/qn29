import { useState } from "react";
import { createContext, PropsWithChildren, useContext } from "react";
import { ITranslatorContext } from "./type";

const TranslatorContext = createContext<ITranslatorContext>({
  srcText: "",
  targetText: "",
  srcLang: "",
  targetLang: "",
  updateSrcText: () => {},
  updateTargetText: () => {},
  updateSrcLang: () => {},
  updateTargetLang: () => {},
  maxInputLeng: 5000,
});

const TranslatorContextProvider = ({ children }: PropsWithChildren) => {
  const [srcText, setSrcText] = useState("");

  const [targetText, setTargetText] = useState("target text");
  const [srcLang, setSrcLang] = useState("");

  const [targetLang, setTargetLang] = useState("");
  return (
    <TranslatorContext.Provider
      value={{
        srcText,
        updateSrcText: setSrcText,
        targetText,
        updateTargetText: setTargetText,
        srcLang,
        targetLang,
        updateSrcLang: setSrcLang,
        updateTargetLang: setTargetLang,
        maxInputLeng: 5000,
      }}
    >
      {children}
    </TranslatorContext.Provider>
  );
};

const useTranslatorContext = () => {
  return useContext<ITranslatorContext>(TranslatorContext);
};

export { TranslatorContextProvider, useTranslatorContext };

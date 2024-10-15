import { useState } from 'react';
import { createContext, PropsWithChildren, useContext } from 'react';
import { EStatus, ITranslatorContext } from './type';

const TranslatorContext = createContext<ITranslatorContext>({
  srcText: '',
  targetText: '',
  srcLang: '',
  targetLang: '',
  updateSrcText: () => {},
  updateTargetText: () => {},
  updateSrcLang: () => {},
  updateTargetLang: () => {},
  maxInputLeng: 5000,
  status: EStatus.idle,
  setStatus: () => {},
});

const TranslatorContextProvider = ({ children }: PropsWithChildren) => {
  const [srcText, setSrcText] = useState('');

  const [targetText, setTargetText] = useState('');
  const [srcLang, setSrcLang] = useState('');

  const [targetLang, setTargetLang] = useState('');
  const [status, setStatus] = useState<EStatus>(EStatus.idle);
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
        status,
        setStatus,
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

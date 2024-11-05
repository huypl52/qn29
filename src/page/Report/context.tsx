import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ETimeScale, ICardContext } from './type';
import { getWeekRange } from './util';

const CardContext = createContext<ICardContext>({
  timeScale: ETimeScale.day,
  setTimeScale: () => {},
  dateRange: [null, null],
  setDateRange: () => {},
});

const CardContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedDateRange, setDateRange] = useState<(Date | null)[]>([
    null,
    null,
  ]);
  const [timeScale, setTimeScale] = useState(ETimeScale.day); // Default to 'day'

  const dateRange = useMemo(() => {
    if (timeScale === ETimeScale.day) {
      const { start, end } = getWeekRange();
      return [start, end];
    }

    return selectedDateRange;
  }, [timeScale, selectedDateRange]);

  return (
    <CardContext.Provider
      value={{
        dateRange,
        setDateRange,
        timeScale,
        setTimeScale,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

const useCardContext = () => {
  return useContext(CardContext);
};

export { CardContextProvider, useCardContext };

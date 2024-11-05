export interface ICardContext {
  timeScale: ETimeScale;
  setTimeScale: (t: ETimeScale) => void;
  dateRange: (Date | undefined)[];
  setDateRange: (date: (Date | null)[]) => void;
}

export enum ETimeScale {
  day = 'day',
  month = 'month',
  year = 'year',
}

export const timeScaleToPeriod = (t: ETimeScale): number => {
  switch (t) {
    case ETimeScale.day:
      return 1;
    case ETimeScale.month:
      return 2;
    case ETimeScale.year:
      return 3;
  }
};

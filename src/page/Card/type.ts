export interface ICardContext {
  timeScale: ETimeScale;
  setTimeScale: (t: ETimeScale) => void;
  dateRange: (Date | null)[];
  setDateRange: (date: (Date | null)[]) => void;
}

export enum ETimeScale {
  day = 'day',
  month = 'month',
  year = 'year',
}

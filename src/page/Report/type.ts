import { IStatisticalGroupParam } from "~/type/task";

export interface IReportContext {
  timeScale: ETimeScale | undefined;
  setTimeScale: (t: ETimeScale | undefined) => void;
  dateRange: (Date | string | undefined)[];
  setDateRange: (date: (Date | null)[]) => void;
  requestParams?: IStatisticalGroupParam;
}

export enum ETimeScale {
  day = 'day',
  week = 'week',
  month = 'month',
}

export const timeScaleToPeriod = (t?: ETimeScale): number => {
  switch (t) {
    case ETimeScale.day:
      return 0;
    case ETimeScale.week:
      return 1;
    case ETimeScale.month:
      return 2;
    default:
      return 0;
  }
};

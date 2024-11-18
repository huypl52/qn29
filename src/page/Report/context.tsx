import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { getUserRole } from '~/storage/auth';
import { useOrgTreeStore } from '~/store/orgTree';
import { useUserTreeStore } from '~/store/userTree';
import { IStatisticalGroupParam } from '~/type/task';
import { ERole } from '~/type/user';
import { ETimeScale, IReportContext, timeScaleToPeriod } from './type';

const ReportContext = createContext<IReportContext>({
  timeScale: ETimeScale.day,
  setTimeScale: () => {},
  dateRange: [undefined, undefined],
  setDateRange: () => {},
});

const ReportContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedDateRange, setDateRange] = useState<(Date | null)[]>([
    null,
    null,
  ]);
  const [timeScale, setTimeScale] = useState<ETimeScale | undefined>(
    ETimeScale.day
  ); // Default to 'day'

  const userRole = getUserRole();
  const { selectedNodeId } = useUserTreeStore();
  const { orgs } = useOrgTreeStore();

  const dateRange = useMemo(() => {
    // if (timeScale === ETimeScale.day) {
    //   const { start, end } = getWeekRange();
    //   return [start, end].map((v) => v.toLocaleDateString('en-CA'));
    // }

    return selectedDateRange.map((v) => v?.toLocaleDateString('en-CA'));
  }, [selectedDateRange]);

  const orgIds = useMemo(() => {
    return orgs.map((v) => v.id);
  }, [orgs]);

  const requestParams: IStatisticalGroupParam = useMemo(() => {
    console.log({ selectedNodeId });
    const params: IStatisticalGroupParam = {
      group: timeScale ? timeScaleToPeriod(timeScale) : undefined,
      from_date: dateRange[0] ? dateRange[0] : undefined,
      to_date: dateRange[1] ? dateRange[1] : undefined,
    };

    const isUser = userRole === ERole.user;
    const isSuperAdmin = userRole === ERole.superAdmin;
    const isAdmin = userRole === ERole.admin;

    if (isUser) {
      params['self'] = 1;
    } else {
      if (selectedNodeId) {
        if (orgIds.includes(selectedNodeId)) {
          params['orgid'] = selectedNodeId;
        } else {
          params['userid'] = selectedNodeId;
        }
      } 
      // else {
      //   if (isAdmin) {
      //     params['orgid'] = orgs[0]?.id;
      //   }
      // }
    }

    return params;
  }, [dateRange, orgIds, selectedNodeId, timeScale, userRole]);

  return (
    <ReportContext.Provider
      value={{
        dateRange,
        setDateRange,
        timeScale,
        setTimeScale,
        requestParams,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

const useReportContext = () => {
  return useContext(ReportContext);
};

export { ReportContextProvider, useReportContext };


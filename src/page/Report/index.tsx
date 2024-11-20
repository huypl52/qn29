import TreeLeftBar from '~/feature/unit/TreeLeftBar';
import { Container } from './Container';
import { ReportContextProvider } from './context';
import OCRChart from './OCRChart.';
import TextChart from './TextChart';

const Report = () => {
  return (
    <TreeLeftBar>
      <div className="w-full px-16">
        <ReportContextProvider>
          <Container />
          <div className="flex gap-3">
            <OCRChart />
            <TextChart />
          </div>
        </ReportContextProvider>
      </div>
    </TreeLeftBar>
  );
};

export default Report;

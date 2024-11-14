import TreeLeftBar from '~/feature/unit/TreeLeftBar';
import { Container } from './Container';
import { CardContextProvider } from './context';
import OCRChart from './OCRChart.';
import TextChart from './TextChart';

const Report = () => {
  return (
    <TreeLeftBar>
    <div className="w-full px-16">

    <CardContextProvider>
      <Container />
      <div className="flex gap-3">
        <OCRChart />
        <TextChart />
      </div>
    </CardContextProvider>
    </div>
    </TreeLeftBar>
  );
};

export default Report;

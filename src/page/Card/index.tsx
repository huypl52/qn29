import { Container } from './Container';
import { CardContextProvider } from './context';

const Charts = () => {
  return (
    <CardContextProvider>
      <Container />
    </CardContextProvider>
  );
};

export default Charts;

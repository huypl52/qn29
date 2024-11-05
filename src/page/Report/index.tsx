import { Container } from './Container';
import { CardContextProvider } from './context';

const Report = () => {
  return (
    <CardContextProvider>
      <Container />
    </CardContextProvider>
  );
};

export default Report;

import { DragDropContextProvider } from '~/component/Drag&Drop/context';
import Container from './Container';
import { OcrContextProvider } from './context';

const Ocr = () => {
  return (
    <DragDropContextProvider>
      <OcrContextProvider>
        <Container />
      </OcrContextProvider>
    </DragDropContextProvider>
  );
};

export default Ocr;

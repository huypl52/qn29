import { DragDropContextProvider } from '~/component/Drag&Drop/context';
import Container from './Container';
import { OcrContextProvider } from './context';
import React from 'react';

const Audio: React.FC<{}> = () => {
  return (
    <DragDropContextProvider>
      <OcrContextProvider>
        <Container />
      </OcrContextProvider>
    </DragDropContextProvider>
  );
};

export default Audio;

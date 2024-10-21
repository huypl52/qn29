import { DragDropContextProvider } from '~/component/Drag&Drop/context';
import Container from './Container';
import { OcrContextProvider } from './context';
import React from "react";

const Ocr: React.FC<{ updateViewHistory: (status: boolean) => void, updateSavedText: (status:boolean)=> void }> = ({ updateViewHistory,updateSavedText}) => {

    return (
    <DragDropContextProvider>
      <OcrContextProvider>
        <Container updateViewHistory={updateViewHistory} updateSavedText={updateSavedText} />
      </OcrContextProvider>
    </DragDropContextProvider>
  );
};

export default Ocr;

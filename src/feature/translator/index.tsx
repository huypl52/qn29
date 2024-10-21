import Container from './Container';
import React from "react";

const Translator: React.FC<{ updateViewHistory: (status: boolean) => void, updateSavedText: (status:boolean)=> void }> = ({ updateViewHistory,updateSavedText}) => {
  return <Container updateViewHistory={updateViewHistory} updateSavedText={updateSavedText}/>;
};

export default Translator;

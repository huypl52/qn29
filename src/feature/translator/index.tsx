import Container from './Container';
import React from "react";

const Translator: React.FC<{ updateViewHistory: (status: boolean) => void }> = ({ updateViewHistory }) => {
  return <Container updateViewHistory={updateViewHistory} />;
};

export default Translator;

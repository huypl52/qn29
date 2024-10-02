import React from "react";
import Translator from "./feature/translator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div>
      <Translator />
      <ToastContainer />
    </div>
  );
};

export default App;

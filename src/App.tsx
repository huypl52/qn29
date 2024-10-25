import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContainer from './auth';
import 'react-datepicker/dist/react-datepicker.css';


const App: React.FC = () => {
  return (
    <>
      <AuthContainer />
      <ToastContainer />
    </>
  );
};

export default App;

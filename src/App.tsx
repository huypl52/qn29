import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContainer from './auth';

const App: React.FC = () => {
  return (
    <>
      <AuthContainer />
      <ToastContainer />
    </>
  );
};

export default App;

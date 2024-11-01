import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { initApi } from './service/_req';

const App = lazy(async () => {
  initApi();
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./App')), 2000);
  });
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

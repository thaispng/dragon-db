import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/reset.css'; 
import App from './App';
import reportWebVitals from './lib/reportWebVitals'; 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Se quiser medir a performance:
reportWebVitals();

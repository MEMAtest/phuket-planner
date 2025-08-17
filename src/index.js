import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { TripProvider } from './context/TripContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <TripProvider>
      <App />
    </TripProvider>
  </React.StrictMode>
);

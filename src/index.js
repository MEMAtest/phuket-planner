import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import './i18n/i18n'; // Initialize i18next
import App from './App';
import { TripProvider } from './context/TripContext';
import { CountryProvider } from './state/CountryContext';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <CountryProvider>
      <TripProvider>
        <App />
      </TripProvider>
    </CountryProvider>
  </React.StrictMode>
);

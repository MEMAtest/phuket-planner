import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import './i18n/i18n'; // Initialize i18next
import App from './App';
import { TripProvider } from './context/TripContext';
import { CountryProvider } from './state/CountryContext';
import { ProfileProvider } from './state/ProfileContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <CountryProvider>
      <ProfileProvider>
        <TripProvider>
          <App />
        </TripProvider>
      </ProfileProvider>
    </CountryProvider>
  </React.StrictMode>
);

// Register service worker for PWA support
serviceWorkerRegistration.register({
  onSuccess: () => console.log('Service Worker registered successfully'),
  onUpdate: (registration) => {
    console.log('New version available');
    // Notify user that an update is available
    if (window.confirm('New version available! Reload to update?')) {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      window.location.reload();
    }
  }
});

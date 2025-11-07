// ──────────────────────────────────────────────────────────────────────────────
// i18n Configuration
// Uses react-i18next for internationalization
// ──────────────────────────────────────────────────────────────────────────────

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getAllLocales } from '../countries';

// Import locale resources
import enGB from './locales/en-GB/common.json';
import zhHK from './locales/zh-HK/common.json';
import zhCN from './locales/zh-CN/common.json';
import thTH from './locales/th-TH/common.json';

const resources = {
  'en-GB': { common: enGB },
  'zh-HK': { common: zhHK },
  'zh-CN': { common: zhCN },
  'th-TH': { common: thTH }
};

void i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-GB',
    supportedLngs: getAllLocales(),
    defaultNS: 'common',
    interpolation: {
      escapeValue: false // React already escapes
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;

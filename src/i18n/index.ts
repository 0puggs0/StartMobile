import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from '../locales/en.json';
import ru from '../locales/ru.json';

const resources = {
  en: { translation: en },
  ru: { translation: ru },
};

const fallbackLng = 'ru';

i18n.use(initReactI18next).init({
  resources,
  lng: RNLocalize.getLocales()[0]?.languageCode || fallbackLng,
  fallbackLng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

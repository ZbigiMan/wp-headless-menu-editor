import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './translations/en'

const resources = {
  en: en
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    keySeparator: false,

    interpolation: {
      escapeValue: false
    },
    debug: false
  })

export default i18n

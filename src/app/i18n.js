import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enUs from './translations/en_US.js'
import plPl from './translations/pl_PL.js'
import config from './config'

class I18n {
  init = () => {
    const resources = {
      en_US: enUs,
      pl_PL: plPl
    }

    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: config.locale.current,
        fallbackLng: 'en_US',
        keySeparator: false,
        interpolation: {
          escapeValue: false
        },
        debug: true
      })
  }
}
export default I18n

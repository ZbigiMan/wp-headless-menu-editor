import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import config from './config'

import enUs from '../../translations/en_US.json'
import plPl from '../../translations/pl_PL.json'

class I18n {
  init = () => {
    const resources = {
      en_US: enUs,
      pl_PL: plPl
    }

    i18next
      .use(initReactI18next)
      .init({
        resources,
        lng: config.locale.current,
        fallbackLng: 'en_US',
        keySeparator: false,
        interpolation: {
          escapeValue: false
        },
        react: {
          wait: true
        },
        debug: true
      })
  }
}
export default I18n

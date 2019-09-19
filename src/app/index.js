import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import config from './config'
import store from './store'
import App from './app'

/* global data */

let documentReady = new Promise(
  (resolve) => document.addEventListener('DOMContentLoaded', resolve)
)

documentReady.then(() => {
  const root = document.querySelector('#root_wp_headless_menu_editor')

  config.locale = data.locale
  config.wp_ajax_url = data.urls.wpajax
  config.adminUrl = data.urls.admin
  config.restUrl = data.urls.rest
  config.routerBase = data.urls.routerBase

  render(
    <Provider store={store}>
      <Router basename={config.routerBase}>
        <App />
      </Router>
    </Provider>,
    root)
})

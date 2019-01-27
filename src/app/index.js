import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import App from './app'

let documentReady = new Promise(
  (resolve) => document.addEventListener('DOMContentLoaded', resolve)
)

documentReady.then(() => {
  const root = document.querySelector('#root_headless_dashboard_menu_editor')
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    root)
})

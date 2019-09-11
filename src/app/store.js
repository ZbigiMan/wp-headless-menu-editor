import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducer from './_redux-reducers'

/* global MODE */
var middleware
var mode

if (typeof MODE === 'undefined') {
  mode = 'development'
} else {
  mode = MODE
}

if (mode === 'development') {
  const logger = createLogger()
  middleware = applyMiddleware(promise(), thunk, logger)
} else {
  middleware = applyMiddleware(promise(), thunk)
}

export default createStore(reducer, middleware)

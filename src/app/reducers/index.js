import { combineReducers } from 'redux'

import common from './common.reducer'
import menus from './menus.reducer'
import posts from './posts.reducer'

export default combineReducers({
  common,
  menus,
  posts
})

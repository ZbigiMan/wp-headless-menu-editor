import { combineReducers } from 'redux';

import menus from './menus.reducer';
import posts from './posts.reducer';

export default combineReducers({
    menus,
    posts
});
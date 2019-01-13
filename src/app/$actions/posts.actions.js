import * as types from '../$constants/posts-action-types';

export function setPostsTypes(data) {
    return {
        type: types.SET_POSTS_TYPES,
        playload: data
    }
}

export function setCurrentPostsTypes(data) {
    return {
        type: types.SET_CURRENT_POSTS_TYPES,
        playload: data.map((item) => {
            return item.value;
        })
    }
}

export function updateCurrentPostsTypes(data) {
    return {
        type: types.UPDATE_CURRENT_POSTS_TYPES,
        playload: data
    }
}

export function selectCurrentPostsFilter(data) {
    return {
        type: types.SELECT_CURRENTS_POSTS_FILTER,
        playload: data
    }
}

export function switchHidePostsFromCurrentMenu() {
    return {
        type: types.SWITCH_HIDE_POSTS_FROM_CURRENT_MENU
    }
}

export function switchPostsSort() {
    return {
        type: types.SWITCH_POSTS_SORT
    }
}


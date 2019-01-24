import postsService from '../$services/posts.service';
import * as types from '../$constants/posts-action-types';

export function getPosts(postsTypes) {  
    console.log('postsTypes', postsTypes);
    // let types = postsTypes.map(item => {
    //     return item.value;
    // });
    return dispatch => {
        dispatch(getPostsStarted());
        postsService.getPosts(postsTypes).then(res => {
            dispatch(getPostsSuccess(res));
        })
    }
}

const getPostsStarted = () => {
    return {
        type: types.GET_POSTS_STARTED
    }
}

const getPostsSuccess = (data) => {
    return {
        type: types.GET_POSTS_SUCCESS,
        playload: data
    }
}

export function setPostsTypes(data) {
    return dispatch => {
        dispatch(setPostsTypesSuccess(data));
        dispatch(updateCurrentPostsTypes(data.map(item => {
            return item.value;
        })));
    }    
}

const setPostsTypesSuccess = (data) => {
    return {
        type: types.SET_POSTS_TYPES_SUCCESS,
        playload: data
    }
}

export function updateCurrentPostsTypes(data) {
    return dispatch => {
        dispatch(updateCurrentPostsTypesSuccess(data));
        dispatch(getPosts(data));
    }
}

const updateCurrentPostsTypesSuccess = (data) => {
    return {
        type: types.UPDATE_CURRENT_POSTS_TYPES_SUCCESS,
        playload: data
    }
}

export function selectCurrentPostsOrder(data) {
    return {
        type: types.SELECT_CURRENT_POSTS_ORDER,
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


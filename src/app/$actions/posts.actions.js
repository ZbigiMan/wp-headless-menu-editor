import * as _ from 'lodash';
import store from '../store';
import postsService from '../$services/posts.service';
import * as types from '../$constants/posts-action-types';

export function getPosts(postsTypes) {
    return dispatch => {
        dispatch(getPostsStarted());
        postsService.getPosts(postsTypes).then(res => {
            dispatch(getPostsLoadded(res));
        })
    }
}

const getPostsStarted = () => {
    return {
        type: types.GET_POSTS_STARTED
    }
}

const getPostsLoadded = (data) => {
    return dispatch => {
        dispatch(getPostsSuccess(data));
        dispatch(filterPosts());
    }
}

const filterPosts = () => {
    let posts = hidePostsFromCurrentMenu();
    posts = orderPosts(posts);
    return dispatch => {
        dispatch(setCurrentPosts(posts));
    }
}

const hidePostsFromCurrentMenu = () => {
    const state = store.getState();
    let posts = state.posts.allPosts;
    if (state.posts.hidePostsFromCurrentMenu) {
        posts = posts.filter(post => {
            const isInMenu = state.menus.currentMenuData.find(item => {
                return parseInt(item.object_id) === parseInt(post.object_id);
            });
            if (!isInMenu) {
                return post;
            }
        });
    }
    return posts;
}

const orderPosts = (posts) => {
    const state = store.getState();
    posts = _.sortBy(posts, ['post', state.posts.currentPostsOrder]);
        if (!state.posts.postsSortUp) {
            posts.reverse();
        }
        return posts;
}

const getPostsSuccess = (data) => {
    return {
        type: types.GET_POSTS_SUCCESS,
        playload: data
    }
}

const setCurrentPosts = (data) => {
    return {
        type: types.SET_CURRENT_POSTS,
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
    const state = store.getState();
    return dispatch => {
        dispatch(setCurrentPostsOrder(data));
        dispatch(filterPosts());
    }
}

const setCurrentPostsOrder = (data) => {
    return {
        type: types.SET_CURRENT_POSTS_ORDER,
        playload: data
    }
}

export function switchHidePostsFromCurrentMenu() {
    return dispatch => {
        dispatch(setHidePostsFromCurrentMenu());
        dispatch(filterPosts());
    }
}

const setHidePostsFromCurrentMenu = () => {
    return {
        type: types.SET_HIDE_POSTS_FROM_CURRENT_MENU
    }
}

export function switchPostsSort() {
    return dispatch => {
        dispatch(setPostsSort());
        dispatch(filterPosts());
    }
}

const setPostsSort = () => {
    return {
        type: types.SET_POSTS_SORT
    }
}
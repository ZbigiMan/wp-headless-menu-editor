import { sortBy } from 'lodash'
import store from '../store'
import postsService from '../services/posts.service'
import * as types from '../_redux-constants/posts-action-types'

export function getPosts (postTypes) {
  return async dispatch => {
    dispatch(getPostsStarted())
    try {
      await postsService.getPosts(postTypes).then(res => {
        dispatch(getPostsSuccess(res))
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getPostsStarted () {
  return {
    type: types.GET_POSTS_STARTED
  }
}

export function getPostsSuccess (data) {
  return dispatch => {
    dispatch(setAllPosts(data))
    dispatch(setCurrentPosts(
      orderPosts(hidePostsFromCurrentMenu(data))
    ))
  }
}

export function setAllPosts (data) {
  return {
    type: types.SET_ALL_POSTS,
    playload: data
  }
}

export function setCurrentPosts (data) {
  return {
    type: types.SET_CURRENT_POSTS,
    playload: data
  }
}

export function setPostTypes (data) {
  return dispatch => {
    dispatch(setPostTypesSuccess(data))
    dispatch(updateCurrentPostTypes(data.map(item => {
      return item.value
    })))
  }
}

export function setPostTypesSuccess (data) {
  return {
    type: types.SET_POSTS_TYPES_SUCCESS,
    playload: data
  }
}

export function updateCurrentPostTypes (data) {
  return dispatch => {
    dispatch(updateCurrentPostTypesSuccess(data))
    dispatch(getPosts(data))
  }
}

export function updateCurrentPostTypesSuccess (data) {
  return {
    type: types.UPDATE_CURRENT_POSTS_TYPES_SUCCESS,
    playload: data
  }
}

export function selectCurrentPostsOrder (data) {
  return (dispatch, getState) => {
    dispatch(setCurrentPostsOrder(data))
    if (getState().posts) {
      dispatch(setCurrentPosts(
        orderPosts(hidePostsFromCurrentMenu(getState().posts.allPosts))
      ))
    }
  }
}

export function setCurrentPostsOrder (data) {
  return {
    type: types.SET_CURRENT_POSTS_ORDER,
    playload: data
  }
}

export function switchHidePostsFromCurrentMenu () {
  return (dispatch, getState) => {
    dispatch(setHidePostsFromCurrentMenu())
    if (getState().posts) {
      dispatch(setCurrentPosts(
        orderPosts(hidePostsFromCurrentMenu(getState().posts.allPosts))
      ))
    }
  }
}

export function setHidePostsFromCurrentMenu () {
  return {
    type: types.SET_HIDE_POSTS_FROM_CURRENT_MENU
  }
}

export function switchPostsSort () {
  return (dispatch, getState) => {
    dispatch(setPostsSort())
    if (getState().posts) {
      dispatch(setCurrentPosts(
        orderPosts(hidePostsFromCurrentMenu(getState().posts.allPosts))
      ))
    }
  }
}

export function setPostsSort () {
  return {
    type: types.SET_POSTS_SORT
  }
}

export function orderPosts (posts) {
  const state = store.getState()
  posts = sortBy(posts, ['post', state.posts.currentPostsOrder])
  if (!state.posts.postsSortUp) {
    posts.reverse()
  }
  return posts
}

export function hidePostsFromCurrentMenu (posts) {
  const state = store.getState()
  if (state.posts.hidePostsFromCurrentMenu) {
    posts = posts.filter(post => {
      const isInMenu = state.menus.currentMenuData.find(item => {
        return parseInt(item.object_id) === parseInt(post.object_id)
      })
      if (!isInMenu) {
        return post
      }
    })
  }
  return posts
}

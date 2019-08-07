import menusService from '../services/menus.service'
import { setCurrentPosts, orderPosts, hidePostsFromCurrentMenu } from './posts.actions'
import * as types from '../_redux-constants/menus-action-types'

export function setMenus (data) {
  return {
    type: types.SET_MENUS,
    playload: menusService.parseMenus(data)
  }
}

export function selectMenu (menuId) {
  return async dispatch => {
    dispatch(setMenuId(menuId))
    dispatch(getMenuData(menuId))
  }
}

export function setMenuId (menuId) {
  return {
    type: types.SET_CURRENT_MENU_ID,
    playload: menuId
  }
}

export function getMenuData (menuId) {
  return async dispatch => {
    dispatch(getMenuDataStarted())
    try {
      await menusService.getMenuData(menuId).then((res) => {
        dispatch(getMenuDataLoaded(res))
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getMenuDataStarted () {
  return {
    type: types.GET_MENU_DATA_STARTED
  }
}

export function getMenuDataLoaded (data) {
  return (dispatch, getState) => {
    dispatch(getMenuDataSuccess(data))
    if (getState().posts) {
      dispatch(setCurrentPosts(
        orderPosts(hidePostsFromCurrentMenu(getState().posts.allPosts))
      ))
    }
  }
}

export function getMenuDataSuccess (data) {
  return {
    type: types.GET_MENU_DATA_SUCCESS,
    playload: data
  }
}

export function saveMenuData (menuId, menuData, options) {
  return async dispatch => {
    dispatch(saveMenuDataStarted(menuData))
    try {
      await menusService.saveMenuData(menuId, menuData).then((res) => {
        dispatch(saveMenuDataSuccess(res))
        if (options && options.reload) {
          dispatch(getMenuData(menuId))
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function saveMenuDataStarted (data) {
  return {
    type: types.SAVE_MENU_DATA_STARTED,
    playload: data
  }
}

export function saveMenuDataSuccess (res) {
  return {
    type: types.SAVE_MENU_DATA_SUCCESS,
    playload: res
  }
}

export function addToMenu (item) {
  return {
    type: types.ADD_TO_MENU,
    playload: item
  }
}

export function confirmRemoveFromMenu (options) {
  return {
    type: types.CONFIRM_REMOVE_FROM_MENU,
    playload: options
  }
}

export function removeFromMenu (item) {
  return {
    type: types.REMOVE_FROM_MENU,
    playload: item
  }
}

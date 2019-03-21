import menusService from '../$services/menus.service'
import { filterPosts } from './posts.actions'
import * as types from '../$constants/menus-action-types'

export function setMenus (data) {
  return {
    type: types.SET_MENUS,
    playload: menusService.fetchMenus(data)
  }
}

export function selectMenu (menuId) {
  return dispatch => {
    dispatch(setMenuId(menuId))
    dispatch(getMenuData(menuId))
  }
}

export function saveMenuData (menuId, menuData, options) {
  return dispatch => {
    dispatch(saveMenuDataStarted(menuData))
    menusService.saveMenuData(menuId, menuData).then((res) => {
      dispatch(saveMenuDataSuccess(res))
      if (options && options.reload) {
        dispatch(getMenuData(menuId))
      }
    })
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

const setMenuId = (menuId) => {
  return {
    type: types.SET_CURRENT_MENU_ID,
    playload: menuId
  }
}

const getMenuData = (menuId) => {
  return dispatch => {
    dispatch(getMenuDataStarted())
    menusService.getMenuData(menuId).then((res) => {
      dispatch(getMenuDataLoaded(res))
    })
  }
}

const getMenuDataStarted = () => {
  return {
    type: types.GET_MENU_DATA_STARTED
  }
}

const getMenuDataLoaded = (data) => {
  return dispatch => {
    dispatch(getMenuDataSuccess(data))
    dispatch(filterPosts())
  }
}

const getMenuDataSuccess = (data) => {
  return {
    type: types.GET_MENU_DATA_SUCCESS,
    playload: data
  }
}

const saveMenuDataStarted = (data) => {
  return {
    type: types.SAVE_MENU_DATA_STARTED,
    playload: data
  }
}

const saveMenuDataSuccess = (res) => {
  return {
    type: types.SAVE_MENU_DATA_SUCCESS,
    playload: res
  }
}

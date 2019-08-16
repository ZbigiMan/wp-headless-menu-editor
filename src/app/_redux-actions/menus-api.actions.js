import menusApiService from '../services/menus-api.service'
import * as types from '../_redux-constants/menus-api-action-types'

export function apiGetMenus () {
  return async dispatch => {
    dispatch(apiGetMenusStarted)
    await menusApiService.getMenus().then((data) => {
      dispatch(apiGetMenusSuccess(data))
      if (data.length > 0) {
        dispatch(apiGetMenuData(data[0].term_id))
      }
    })
  }
}

export function apiGetMenuData (id) {
  return async dispatch => {
    dispatch(apiGetMenuDataStarted)
    dispatch(apiSetMenuId(id))
    await menusApiService.getMenus({
      id: id
    }).then((data) => {
      dispatch(apiGetMenuDataSuccess(data))
    })
  }
}

export function apiGetMenusStarted () {
  return {
    type: types.API_GET_MENUS_STARTED
  }
}

export function apiGetMenusSuccess (data) {
  return {
    type: types.API_GET_MENUS_SUCCESS,
    playload: data
  }
}

export function apiGetMenuDataStarted () {
  return {
    type: types.API_GET_MENU_DATA_STARTED
  }
}
export function apiGetMenuDataSuccess (data) {
  return {
    type: types.API_GET_MENU_DATA_SUCCESS,
    playload: data
  }
}

export function apiSetMenuId (data) {
  return {
    type: types.API_SET_MENU_ID,
    playload: data
  }
}

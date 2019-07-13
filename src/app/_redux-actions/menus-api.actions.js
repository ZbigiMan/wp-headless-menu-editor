import menusApiService from '../services/menus-api.service'
import * as types from '../_redux-constants/menus-api-action-types'

export function apiGetMenus (attrs) {
  return dispatch => {
    dispatch(apiGetMenusStarted)
    menusApiService.getMenus(attrs).then((data) => {
      dispatch(apiGetMenusSuccess(data))
      if (data.length > 0) {
        dispatch(apiGetMenuDataStarted)
        dispatch(setCurrentMenuId(data[0].term_id))
        menusApiService.getMenus({
          id: data[0].term_id
        }).then((data) => {
          dispatch(apiGetMenuDataSuccess(data))
        })
      }
    })
  }
}

export function setCurrentMenuId (id) {
  return {
    type: types.API_SET_CURRENT_MENU_ID,
    playload: id
  }
}

const apiGetMenusStarted = () => {
  return {
    type: types.API_GET_MENUS_STARTED
  }
}

const apiGetMenusSuccess = (data) => {
  return {
    type: types.API_GET_MENUS_SUCCESS,
    playload: data
  }
}

const apiGetMenuDataStarted = () => {
  return {
    type: types.API_GET_MENU_DATA_STARTED
  }
}
const apiGetMenuDataSuccess = (data) => {
  return {
    type: types.API_GET_MENU_DATA_SUCCESS,
    playload: data
  }
}

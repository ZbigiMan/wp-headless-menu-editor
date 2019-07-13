import menusApiService from '../services/menus-api.service'
import * as types from '../_redux-constants/menus-api-action-types'

export function apiGetMenus (attrs) {
  return dispatch => {
    dispatch(apiGetMenusStarted)
    menusApiService.getMenus(attrs).then((data) => {
      dispatch(apiGetMenusSuccess(data))
      if (data.length > 0) {
        dispatch(apiGetMenuData(data[0].term_id))
      }
    })
  }
}

export function apiGetMenuData (id) {
  return dispatch => {
    dispatch(apiGetMenuDataStarted)
    dispatch(apiSetMenuId(id))
    menusApiService.getMenus({
      id: id
    }).then((data) => {
      dispatch(apiGetMenuDataSuccess(data))
    })
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

const apiSetMenuId = (data) => {
  return {
    type: types.API_SET_MENU_ID,
    playload: data
  }
}

import * as types from '../_redux-constants/menus-api-action-types'

const initialState = {
  menusLoading: false,
  menuLoading: false,
  menus: [],
  menu: [],
  menuDataLoading: false,
  currentMenuData: [],
  currentMenuId: ''
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case types.API_GET_MENUS_STARTED: {
      return {
        ...state,
        menusLoading: true
      }
    }

    case types.API_GET_MENUS_SUCCESS: {
      return {
        ...state,
        menusLoading: false,
        menus: action.playload
      }
    }

    case types.API_GET_MENU_DATA_STARTED: {
      return {
        ...state,
        menuDataLoading: true
      }
    }

    case types.API_GET_MENU_DATA_SUCCESS: {
      return {
        ...state,
        menuDataLoading: false,
        currentMenuData: action.playload
      }
    }

    case types.API_SET_CURRENT_MENU_ID: {
      return {
        ...state,
        currentMenuId: action.playload
      }
    }

    default:
      return state
  }
}

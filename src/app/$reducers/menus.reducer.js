import * as types from '../$constants/menus-action-types'

const initialState = {
  menus: [],
  currentMenuId: '',
  currentMenuData: [],
  currentMenuDataLoading: false,
  currentMenuDataSaving: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case types.SET_MENUS:
    {
      return {
        ...state,
        menus: action.playload
      }
    }
    case types.SET_CURRENT_MENU_ID:
    {
      return {
        ...state,
        currentMenuId: action.playload
      }
    }
    case types.GET_MENU_DATA_STARTED:
    {
      return {
        ...state,
        currentMenuDataLoading: true
      }
    }
    case types.GET_MENU_DATA_SUCCESS:
    {
      return {
        ...state,
        currentMenuDataLoading: false,
        currentMenuData: action.playload
      }
    }
    case types.SAVE_MENU_DATA_STARTED: {
      return {
        ...state,
        currentMenuDataSaving: true,
        currentMenuData: action.playload
      }
    }
    case types.SAVE_MENU_DATA_SUCCESS: {
      return {
        ...state,
        currentMenuDataSaving: false
      }
    }
    case types.ADD_TO_MENU: {
      let item = action.playload
      let order = 1
      if (!item.menu_order && state.currentMenuData.length > 0) {
        order = state.currentMenuData.sort((a, b) => {
          return b.menu_order - a.menu_order
        })[0].menu_order + 1
      }

      item.menu_order = order
      const newCurrentMenuData = state.currentMenuData
      newCurrentMenuData.push(item)

      return {
        ...state,
        currentMenuData: newCurrentMenuData
      }
    }
    default:
      return state
  }
};

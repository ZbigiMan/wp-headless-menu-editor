import * as types from '../_redux-constants/menus-action-types'

const initialState = {
  menus: [],
  currentMenuId: '',
  currentMenuName: '',
  currentMenuData: [],
  currentMenuDataLoading: false,
  currentMenuDataSaving: false,
  confirmRemoveMenuItemModal: {
    open: false,
    item: null
  },
  createNewMenuModal: {
    open: false
  },
  confirmRemoveMenuModal: {
    open: false
  }
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
        currentMenuId: action.playload,
        currentMenuName: state.menus.find(menu => {
          return menu.term_id === action.playload
        }).name
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
      if (state.currentMenuData.length > 0) {
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
    case types.CONFIRM_REMOVE_FROM_MENU: {
      return {
        ...state,
        confirmRemoveMenuItemModal: action.playload
      }
    }
    case types.REMOVE_FROM_MENU: {
      let newCurrentMenuData = state.currentMenuData
      newCurrentMenuData.find(item => {
        return item.object_id === action.playload.object_id
      }).__delete = true

      return {
        ...state,
        currentMenuData: newCurrentMenuData
      }
    }
    case types.MODAL_CREATE_MENU_OPEN: {
      return {
        ...state,
        createNewMenuModal: {
          open: action.playload
        }
      }
    }
    case types.CREATE_MENU_STARTED: {
      return {
        ...state,
        currentMenuDataSaving: true
      }
    }
    case types.CREATE_MENU_SUCCESS: {
      return {
        ...state,
        currentMenuDataSaving: false
      }
    }
    case types.DELETE_MENU_STARTED: {
      return {
        ...state,
        currentMenuDataSaving: false
      }
    }
    case types.DELETE_MENU_SUCCESS: {
      return {
        ...state,
        currentMenuDataSaving: false
      }
    }
    case types.MODAL_CONFIRM_REMOVE_MENU_OPEN_CLOSE: {
      return {
        ...state,
        confirmRemoveMenuModal: {
          open: action.playload
        }
      }
    }
    default:
      return state
  }
};

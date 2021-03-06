import * as types from '../_redux-constants/common-action-types'

const initialState = {
  menuItemEditor: {
    open: false,
    item: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case types.OPEN_CLOSE_MENU_ITEM_EDITOR:
    {
      return {
        ...state,
        menuItemEditor: action.playload
      }
    }
    default:
      return state
  }
}

import * as types from '../_redux-constants/common-action-types'

export function openCloseMenuItemEditor (options) {
  return {
    type: types.OPEN_CLOSE_MENU_ITEM_EDITOR,
    playload: options
  }
}

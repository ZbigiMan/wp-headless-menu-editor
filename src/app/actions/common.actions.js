import * as types from '../constants/common-action-types'

export function openCloseMenuItemEditor (options) {
  return {
    type: types.OPEN_CLOSE_MENU_ITEM_EDITOR,
    playload: options
  }
}

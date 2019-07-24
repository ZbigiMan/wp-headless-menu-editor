import * as actions from '../_redux-actions/common.actions'
import * as types from '../_redux-constants/common-action-types'

/* global describe it expect */

describe('Action: openCloseMenuItemEditor', () => {
  const options = {
    open: true
  }

  it(`Should return ${types.OPEN_CLOSE_MENU_ITEM_EDITOR} Action`, () => {
    const expectedAction = {
      type: types.OPEN_CLOSE_MENU_ITEM_EDITOR,
      playload: options
    }
    expect(actions.openCloseMenuItemEditor(options)).toEqual(expectedAction)
  })
})

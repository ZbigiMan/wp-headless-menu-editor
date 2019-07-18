import { setMenus } from '../_redux-actions/menus.actions'
import menusMocs from '../__mocs__/mocs'
import * as types from '../_redux-constants/menus-action-types'
import Menu from '../models/menu.model'

/* global describe it expect */

describe('Action: setMenus', () => {
  const data = menusMocs
  it('should return ' + types.SET_MENUS + ' action', () => {
    const expectedAction = {
      type: types.SET_MENUS,
      playload: data
    }
    expect(setMenus(menusMocs)).toEqual(expectedAction)
  })
  it(types.SET_MENUS + ' playload should be the Array<Menu>', () => {
    const playload = setMenus(menusMocs).playload
    let matches = 0
    playload.forEach(item => {
      if (item instanceof Menu) {
        matches++
      }
    })
    expect(matches).toEqual(playload.length)
  })
})

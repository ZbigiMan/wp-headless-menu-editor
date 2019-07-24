import Menu from '../models/menu.model'
import MenusData from '../__mocs__/__data__/menus-data-from-api'

/* global describe it expect */

describe('Model: Menu', () => {
  it('Should be compatible with API data', () => {
    let menu = new Menu(MenusData[0])
    const modelAttrs = Object.keys(menu)
    const ApiAttrs = Object.keys(MenusData[0])

    expect(modelAttrs).toEqual(ApiAttrs)
  })
})

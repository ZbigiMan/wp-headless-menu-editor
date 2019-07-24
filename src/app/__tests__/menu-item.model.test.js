import MenuItem from '../models/menu-item.model'
import MenuDataFromApi from '../__mocs__/__data__/menu-data-from-api'

/* global describe it expect */

describe('Model: MenuItem', () => {
  it('Should be compatible with API data', () => {
    let menuItem = new MenuItem(MenuDataFromApi[0])
    const modelAttrs = Object.keys(menuItem)
    const ApiAttrs = Object.keys(MenuDataFromApi[0])

    expect(modelAttrs).toEqual(ApiAttrs)
  })
})

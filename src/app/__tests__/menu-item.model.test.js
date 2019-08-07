import MenuItem from '../models/menu-item.model'
import MenuDataFromApi from '../__mocs__/__data__/menu-data-from-api'
import PostsDataFromApi from '../__mocs__/__data__/posts-data-from-api'

/* global describe it expect */

describe('Model: MenuItem', () => {
  it('Should be compatible with menus data from API', () => {
    let menuItem = new MenuItem(MenuDataFromApi[0])
    const modelAttrs = Object.keys(menuItem)
    const apiAttrs = Object.keys(MenuDataFromApi[0])

    let matches = 0
    apiAttrs.forEach(attr => {
      if (modelAttrs.indexOf(attr) !== -1) {
        matches++
      }
    })

    expect(matches).toEqual(apiAttrs.length)
  })

  it('Should be compatible with posts data from API', () => {
    let menuItem = new MenuItem(PostsDataFromApi[0])
    const modelAttrs = Object.keys(menuItem)
    const apiAttrs = Object.keys(PostsDataFromApi[0])

    let matches = 0
    modelAttrs.forEach(attr => {
      if (apiAttrs.indexOf(attr) !== -1) {
        matches++
      }
    })

    expect(matches).toEqual(apiAttrs.length)
  })
})

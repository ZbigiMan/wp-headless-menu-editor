import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import config from '../config'
import * as actions from '../_redux-actions/menus.actions'
import menusData from '../__mocs__/__data__/menus-data'
import menuData from '../__mocs__/__data__/menu-data'
import * as types from '../_redux-constants/menus-action-types'
import menusService from '../services/menus.service'
import Menu from '../models/menu.model'
import MenuItem from '../models/menu-item.model'

/* global describe it expect afterEach */

config.apiUrl = '/wp-admin/admin-ajax.php'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
afterEach(fetchMock.restore)

describe('Action: setMenus', () => {
  it(`Should return ${types.SET_MENUS} Action,
      ${types.SET_MENUS} Action playload should be the Array of Menu models`, () => {
    const expectedAction = {
      type: types.SET_MENUS,
      playload: menusData
    }
    expect(actions.setMenus(menusData)).toEqual(expectedAction)
    const playload = actions.setMenus(menusData).playload
    let matches = 0
    playload.forEach(item => {
      if (item instanceof Menu) {
        matches++
      }
    })
    expect(matches).toEqual(playload.length)
  })
})

describe('Action: selectMenu', () => {
  const menuId = menusData[0].term_id

  it(`Should return ${types.SET_CURRENT_MENU_ID} Action
      and ${types.GET_MENU_DATA_STARTED} Action`, () => {
    const store = mockStore({})
    fetchMock.postOnce(config.apiUrl, {
      body: menuData,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      {
        type: types.SET_CURRENT_MENU_ID,
        playload: menuId
      },
      {
        type: types.GET_MENU_DATA_STARTED
      }
    ]

    return store.dispatch(
      actions.selectMenu(menuId)
    ).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Action: getMenuData', () => {
  const menuId = menusData[0].term_id

  it(`Should return ${types.GET_MENU_DATA_STARTED} Action
      and ${types.GET_MENU_DATA_SUCCESS} Action,
      ${types.GET_MENU_DATA_SUCCESS} Action playload should be the Array of MenuItem models`, () => {
    const store = mockStore({})
    fetchMock.postOnce(config.apiUrl, {
      body: menuData,
      headers: { 'content-type': 'application/json' }
    })

    const menuDataParsed = menusService.fetchMenuData(menuData)

    const expectedActions = [
      {
        type: types.GET_MENU_DATA_STARTED
      },
      {
        type: types.GET_MENU_DATA_SUCCESS,
        playload: menuDataParsed
      }
    ]
    return store.dispatch(
      actions.getMenuData(menuId)
    ).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0])
      expect(store.getActions()[1]).toEqual(expectedActions[1])
      let matches = 0
      menuDataParsed.forEach(item => {
        if (item instanceof MenuItem) {
          matches++
        }
      })
      expect(matches).toEqual(menuDataParsed.length)
    })
  })
})

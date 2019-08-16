import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import config from '../config'
import * as types from '../_redux-constants/menus-api-action-types'
import * as actions from '../_redux-actions/menus-api.actions'
import menusDataFromAPI from '../__mocs__/__data__/menus-data-from-api'
import menuDataFromAPI from '../__mocs__/__data__/menu-data-from-api'

/* global describe it expect afterEach */

config.restUrl = '/wp-json/v2/hme/v1/'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
afterEach(fetchMock.restore)

describe('Action: apiGetMenus', () => {
  it(`Should return ${types.API_GET_MENUS_SUCCESS} and ${types.API_SET_MENU_ID} Actions`, () => {
    const store = mockStore({})
    fetchMock.get(config.restUrl + 'menus/', {
      body: menusDataFromAPI,
      headers: { 'content-type': 'application/json' }
    })

    fetchMock.get(config.restUrl + 'menus/2', {
      body: menuDataFromAPI,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      {
        type: types.API_GET_MENUS_SUCCESS,
        playload: menusDataFromAPI
      },
      { type: types.API_SET_MENU_ID,
        playload: 2
      }
    ]

    return store.dispatch(
      actions.apiGetMenus()
    ).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Action: apiGetMenuData', () => {
  it(`Should return ${types.API_SET_MENU_ID} and ${types.API_GET_MENU_DATA_SUCCESS} Actions`, () => {
    const store = mockStore({})

    fetchMock.get(config.restUrl + 'menus/2', {
      body: menuDataFromAPI,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: types.API_SET_MENU_ID,
        playload: 2
      },
      {
        type: types.API_GET_MENU_DATA_SUCCESS,
        playload: menuDataFromAPI
      }
    ]

    return store.dispatch(
      actions.apiGetMenuData(2)
    ).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Action: apiGetMenusStarted', () => {
  it(`Should return ${types.API_GET_MENUS_STARTED}`, () => {
    const expectedAction = {
      type: types.API_GET_MENUS_STARTED
    }
    expect(actions.apiGetMenusStarted()).toEqual(expectedAction)
  })
})

describe('Action: apiGetMenusSuccess', () => {
  it(`Should return ${types.API_GET_MENUS_SUCCESS}`, () => {
    const expectedAction = {
      type: types.API_GET_MENUS_SUCCESS,
      playload: menusDataFromAPI
    }
    expect(actions.apiGetMenusSuccess(menusDataFromAPI)).toEqual(expectedAction)
  })
})

describe('Action: apiGetMenuDataStarted', () => {
  it(`Should return ${types.API_GET_MENU_DATA_STARTED}`, () => {
    const expectedAction = {
      type: types.API_GET_MENU_DATA_STARTED
    }
    expect(actions.apiGetMenuDataStarted()).toEqual(expectedAction)
  })
})

describe('Action: apiGetMenuDataSuccess', () => {
  it(`Should return ${types.API_GET_MENU_DATA_SUCCESS}`, () => {
    const expectedAction = {
      type: types.API_GET_MENU_DATA_SUCCESS,
      playload: menuDataFromAPI
    }
    expect(actions.apiGetMenuDataSuccess(menuDataFromAPI)).toEqual(expectedAction)
  })
})

describe('Action: apiSetMenuId', () => {
  it(`Should return ${types.API_SET_MENU_ID} Actions`, () => {
    const expectedAction = {
      type: types.API_SET_MENU_ID,
      playload: 2
    }
    expect(actions.apiSetMenuId(2)).toEqual(expectedAction)
  })
})

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import config from '../config'
import * as actions from '../_redux-actions/menus.actions'
import menusDataFromAPI from '../__mocs__/__data__/menus-data-from-api'
import menuDataFromAPI from '../__mocs__/__data__/menu-data-from-api'
import menuDataFromModel from '../__mocs__/__data__/menu-data-from-model'
import postsDataFromAPI from '../__mocs__/__data__/posts-data-from-api'
import * as types from '../_redux-constants/menus-action-types'
import menusService from '../services/menus.service'
import Menu from '../models/menu.model'
import MenuItem from '../models/menu-item.model'
import postsService from '../services/posts.service'

/* global describe it expect afterEach */

config.apiUrl = '/wp-admin/admin-ajax.php'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
afterEach(fetchMock.restore)

const menuId = menusDataFromAPI[0].term_id
const menuItem = new MenuItem(menuDataFromAPI[0])

const postsDataParsed = postsService.parsePostsData(postsDataFromAPI)

const initialState = {
  posts: {
    allPosts: postsDataParsed
  }
}

describe('Action: setMenus', () => {
  it(`Should return ${types.SET_MENUS} Action,
      ${types.SET_MENUS} Action playload should be an Array of Menu models`,
  () => {
    const expectedAction = {
      type: types.SET_MENUS,
      playload: menusDataFromAPI
    }
    expect(actions.setMenus(menusDataFromAPI)).toEqual(expectedAction)
    const playload = actions.setMenus(menusDataFromAPI).playload
    playload.forEach(item => {
      expect(item instanceof Menu).toEqual(true)
    })
  })
})

describe('Action: selectMenu', () => {
  it(`Should return ${types.SET_CURRENT_MENU_ID} Action
      and ${types.GET_MENU_DATA_STARTED} Action`,
  () => {
    const store = mockStore(initialState)
    fetchMock.postOnce(config.apiUrl, {
      body: menuDataFromAPI,
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

describe('Action: setMenuId', () => {
  it(`Should return ${types.SET_CURRENT_MENU_ID} Action`, () => {
    const expectedAction = {
      type: types.SET_CURRENT_MENU_ID,
      playload: menuId
    }
    expect(actions.setMenuId(menuId)).toEqual(expectedAction)
  })
})

describe('Action: getMenuData', () => {
  it(`Should return ${types.GET_MENU_DATA_STARTED} Action
      then ${types.GET_MENU_DATA_SUCCESS} Action,
      ${types.GET_MENU_DATA_SUCCESS} Action playload should be an Array of MenuItem models`,
  () => {
    const store = mockStore(initialState)
    fetchMock.post(config.apiUrl, {
      body: menuDataFromAPI,
      headers: { 'content-type': 'application/json' }
    })

    const menuDataParsed = menusService.parseMenuData(menuDataFromAPI)

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
      store.getActions()[1].playload.forEach(item => {
        expect(item instanceof MenuItem).toEqual(true)
      })
    })
  })
})

describe('Action: saveMenuData', () => {
  it(`Should return ${types.SAVE_MENU_DATA_STARTED} Action,
      then ${types.SAVE_MENU_DATA_SUCCESS} Action,
      if options.reload is true, should return ${types.GET_MENU_DATA_STARTED} Action`,
  () => {
    const store = mockStore({})
    fetchMock.post(config.apiUrl, {
      body: menuDataFromAPI,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      {
        type: types.SAVE_MENU_DATA_STARTED,
        playload: menuDataFromModel
      },
      {
        type: types.SAVE_MENU_DATA_SUCCESS,
        playload: menuDataFromAPI
      },
      {
        type: types.GET_MENU_DATA_STARTED
      }
    ]

    const options = {
      reload: true
    }

    return store.dispatch(
      actions.saveMenuData(menuId, menuDataFromModel, options)
    ).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('Action: saveMenuDataStarted', () => {
  it(`Should return ${types.SAVE_MENU_DATA_STARTED} Action`, () => {
    const expectedAction = {
      type: types.SAVE_MENU_DATA_STARTED,
      playload: menuDataFromModel
    }
    expect(actions.saveMenuDataStarted(menuDataFromModel)).toEqual(expectedAction)
  })
})

describe('Action: saveMenuDataSuccess', () => {
  it(`Should return ${types.SAVE_MENU_DATA_SUCCESS} Action`, () => {
    const expectedAction = {
      type: types.SAVE_MENU_DATA_SUCCESS,
      playload: menuDataFromAPI
    }
    expect(actions.saveMenuDataSuccess(menuDataFromAPI)).toEqual(expectedAction)
  })
})

describe('Action: addToMenu', () => {
  it(`Should return ${types.ADD_TO_MENU} Action`, () => {
    const expectedAction = {
      type: types.ADD_TO_MENU,
      playload: menuItem
    }
    expect(actions.addToMenu(menuItem)).toEqual(expectedAction)
  })
})

describe('Action: confirmRemoveFromMenu', () => {
  it(`Should return ${types.CONFIRM_REMOVE_FROM_MENU} Action`, () => {
    const options = {
      open: true
    }
    const expectedAction = {
      type: types.CONFIRM_REMOVE_FROM_MENU,
      playload: options
    }
    expect(actions.confirmRemoveFromMenu(options)).toEqual(expectedAction)
  })
})

describe('Action: removeFromMenu', () => {
  it(`Should return ${types.REMOVE_FROM_MENU} Action`, () => {
    const expectedAction = {
      type: types.REMOVE_FROM_MENU,
      playload: menuItem
    }
    expect(actions.removeFromMenu(menuItem)).toEqual(expectedAction)
  })
})

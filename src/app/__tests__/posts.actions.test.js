import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import config from '../config'
import * as actions from '../_redux-actions/posts.actions'
import postsDataFromAPI from '../__mocs__/__data__/posts-data-from-api'
import * as types from '../_redux-constants/posts-action-types'
import postsService from '../services/posts.service'
import MenuItem from '../models/menu-item.model'

/* global describe it expect afterEach */

config.apiUrl = '/wp-admin/admin-ajax.php'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
afterEach(fetchMock.restore)

const postTypes = ['post', 'page', 'custom_page']
const postsDataParsed = postsService.parsePostsData(postsDataFromAPI)

const initialState = {
  posts: {
    allPosts: postsDataParsed
  }
}

describe('Action: getPosts', () => {
  it(`Should return ${types.GET_POSTS_STARTED} Action then
    ${types.SET_ALL_POSTS} and ${types.SET_CURRENT_POSTS} Actions
    with playload as Array of MenuItem models`,
  () => {
    const store = mockStore({})
    fetchMock.post(config.apiUrl, {
      body: postsDataFromAPI,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      {
        type: types.GET_POSTS_STARTED
      },
      {
        type: types.SET_ALL_POSTS,
        playload: postsDataParsed
      },
      {
        type: types.SET_CURRENT_POSTS,
        playload: actions.orderPosts(actions.hidePostsFromCurrentMenu(postsDataParsed))
      }
    ]

    return store.dispatch(
      actions.getPosts(postTypes)
    ).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      let matches = 0
      store.getActions()[1].playload.forEach(item => {
        if (item instanceof MenuItem) {
          matches++
        }
      })
      expect(matches).toEqual(store.getActions()[1].playload.length)

      matches = 0
      store.getActions()[2].playload.forEach(item => {
        if (item instanceof MenuItem) {
          matches++
        }
      })
      expect(matches).toEqual(store.getActions()[2].playload.length)
    })
  })
})

describe('Action: getPostsStarted', () => {
  it(`Should return ${types.GET_POSTS_STARTED} Action`, () => {
    const expectedAction = {
      type: types.GET_POSTS_STARTED
    }
    expect(actions.getPostsStarted()).toEqual(expectedAction)
  })
})

describe('Action: getPostsSuccess', () => {
  it(`Should return ${types.SET_ALL_POSTS} and ${types.SET_CURRENT_POSTS} Actions
  with playload as Array of MenuItem models`,
  () => {
    const store = mockStore(initialState)

    const expectedActions = [
      {
        type: types.SET_ALL_POSTS,
        playload: postsDataParsed
      },
      {
        type: types.SET_CURRENT_POSTS,
        playload: actions.orderPosts(actions.hidePostsFromCurrentMenu(postsDataParsed))
      }
    ]

    store.dispatch(
      actions.getPostsSuccess(postsDataParsed)
    )
    expect(store.getActions()).toEqual(expectedActions)
    let matches = 0
    store.getActions()[0].playload.forEach(item => {
      if (item instanceof MenuItem) {
        matches++
      }
    })

    matches = 0
    store.getActions()[1].playload.forEach(item => {
      if (item instanceof MenuItem) {
        matches++
      }
    })
    expect(matches).toEqual(store.getActions()[1].playload.length)
  })
})

describe('Action: setAllPosts', () => {
  it(`Should return ${types.SET_ALL_POSTS} Action`, () => {
    const expectedAction = {
      type: types.SET_ALL_POSTS,
      playload: postsDataParsed
    }

    expect(actions.setAllPosts(postsDataParsed)).toEqual(expectedAction)
  })
})

describe('Action: setCurrentPosts', () => {
  it(`Should return ${types.SET_CURRENT_POSTS} Action`, () => {
    const expectedAction = {
      type: types.SET_CURRENT_POSTS,
      playload: postsDataParsed
    }

    expect(actions.setCurrentPosts(postsDataParsed)).toEqual(expectedAction)
  })
})

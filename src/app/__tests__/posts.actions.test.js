import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import config from '../config'
import * as actions from '../_redux-actions/posts.actions'
import postsDataFromAPI from '../__mocs__/__data__/posts-data-from-api'
import postTypesFromAPI from '../__mocs__/__data__/post-types-from-api'
import * as types from '../_redux-constants/posts-action-types'
import postsService from '../services/posts.service'
import MenuItem from '../models/menu-item.model'

/* global describe it expect afterEach */

config.wp_ajax_url = '/wp-admin/admin-ajax.php'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
afterEach(fetchMock.restore)

const postTypes = ['post', 'page', 'custom_page']
const postsDataParsed = postsService.parsePostsData(postsDataFromAPI)
const postsOrder = 'post_title'

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
    fetchMock.post(config.wp_ajax_url, {
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
      store.getActions()[1].playload.forEach(item => {
        expect(item instanceof MenuItem).toEqual(true)
      })
      store.getActions()[2].playload.forEach(item => {
        expect(item instanceof MenuItem).toEqual(true)
      })
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
    store.getActions()[0].playload.forEach(item => {
      expect(item instanceof MenuItem).toEqual(true)
    })
    store.getActions()[1].playload.forEach(item => {
      expect(item instanceof MenuItem).toEqual(true)
    })
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

describe('Action: setPostTypes', () => {
  it(`Should dispatch setPostTypesSuccess and updateCurrentPostTypes Actions`, () => {
    const action = actions.setPostTypes(postTypesFromAPI).toString()
    expect(action.indexOf('dispatch(setPostTypesSuccess(')).not.toBe(-1)
    expect(action.indexOf('dispatch(updateCurrentPostTypes(')).not.toBe(-1)
  })
})

describe('Action: setPostTypesSuccess', () => {
  it(`Should return ${types.SET_POSTS_TYPES_SUCCESS} Action`, () => {
    const expectedAction = {
      type: types.SET_POSTS_TYPES_SUCCESS,
      playload: postTypesFromAPI
    }

    expect(actions.setPostTypesSuccess(postTypesFromAPI)).toEqual(expectedAction)
  })
})

describe('Action: updateCurrentPostTypes', () => {
  it(`Should dispatch updateCurrentPostTypesSuccess and getPosts Actions`, () => {
    const action = actions.updateCurrentPostTypes(postTypesFromAPI).toString()
    expect(action.indexOf('dispatch(updateCurrentPostTypesSuccess(')).not.toBe(-1)
    expect(action.indexOf('dispatch(getPosts(')).not.toBe(-1)
  })
})

describe('Action updateCurrentPostTypesSuccess', () => {
  const data = postTypesFromAPI.map(item => {
    return item.value
  })
  it(`Should return ${types.UPDATE_CURRENT_POSTS_TYPES_SUCCESS} Action`, () => {
    const expectedAction = {
      type: types.UPDATE_CURRENT_POSTS_TYPES_SUCCESS,
      playload: data
    }

    expect(actions.updateCurrentPostTypesSuccess(data)).toEqual(expectedAction)
  })
  it(`Playload shoulde be an Array of strings`, () => {
    const playload = actions.updateCurrentPostTypesSuccess(data).playload
    expect(Array.isArray(playload)).toEqual(true)
    playload.forEach(item => {
      expect(typeof item).toEqual('string')
    })
  })
})

describe('Action selectCurrentPostsOrder', () => {
  it(`should dispatch setCurrentPostsOrder and setCurrentPosts Actions`, () => {
    const action = actions.selectCurrentPostsOrder(postsDataParsed).toString()
    expect(action.indexOf('dispatch(setCurrentPostsOrder(')).not.toBe(-1)
    expect(action.indexOf('dispatch(setCurrentPosts(')).not.toBe(-1)
  })
})

describe('Action setCurrentPostsOrder', () => {
  it(`Should return ${types.SET_CURRENT_POSTS_ORDER} Action`, () => {
    const expectedAction = {
      type: types.SET_CURRENT_POSTS_ORDER,
      playload: postsOrder
    }
    expect(actions.setCurrentPostsOrder(postsOrder)).toEqual(expectedAction)
  })
})

describe('Action switchHidePostsFromCurrentMenu', () => {
  it(`Should return ${types.SET_HIDE_POSTS_FROM_CURRENT_MENU} and
    ${types.SET_CURRENT_POSTS} Actions`, () => {
    const store = mockStore(initialState)
    const expectedActions = [
      {
        type: types.SET_HIDE_POSTS_FROM_CURRENT_MENU
      },
      { type: types.SET_CURRENT_POSTS,
        playload: actions.orderPosts(actions.hidePostsFromCurrentMenu(postsDataParsed))
      }
    ]
    store.dispatch(actions.switchHidePostsFromCurrentMenu())
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('Action setHidePostsFromCurrentMenu', () => {
  it(`Should return ${types.SET_HIDE_POSTS_FROM_CURRENT_MENU} Action`, () => {
    const expectedAction = {
      type: types.SET_HIDE_POSTS_FROM_CURRENT_MENU
    }
    expect(actions.setHidePostsFromCurrentMenu()).toEqual(expectedAction)
  })
})

describe('Action switchPostsSort', () => {
  it(`Should return ${types.SET_POSTS_SORT} and ${types.SET_CURRENT_POSTS} Actions`, () => {
    const store = mockStore(initialState)
    const expectedActions = [
      { type: types.SET_POSTS_SORT },
      { type: types.SET_CURRENT_POSTS,
        playload: actions.orderPosts(actions.hidePostsFromCurrentMenu(postsDataParsed))
      }
    ]
    store.dispatch(actions.switchPostsSort())
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('Acttion setPostsSort', () => {
  it(`Should return ${types.SET_POSTS_SORT} Action`, () => {
    const expectedAction = {
      type: types.SET_POSTS_SORT
    }
    expect(actions.setPostsSort()).toEqual(expectedAction)
  })
})

describe('Action orderPosts', () => {
  it(`Should return be array of MenuItem models`, () => {
    actions.orderPosts(postsDataParsed).forEach(item => {
      expect(item instanceof MenuItem).toEqual(true)
    })
  })
})

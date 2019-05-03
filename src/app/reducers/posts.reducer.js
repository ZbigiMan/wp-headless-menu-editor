import * as types from '../constants/posts-action-types'

const initialState = {
  postsTypes: [],
  currentPostsTypes: [],
  postsOrder: [{
    value: 'post_date',
    text: 'Date'
  },
  {
    value: 'post_title',
    text: 'Title'
  }
  ],
  currentPostsOrder: 'post_date',
  postsSortUp: false,
  hidePostsFromCurrentMenu: false,
  allPosts: [],
  currentPosts: [],
  postsLoading: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case types.GET_POSTS_STARTED: {
      return {
        ...state,
        postsLoading: true
      }
    }

    case types.GET_POSTS_SUCCESS: {
      return {
        ...state,
        postsLoading: false,
        allPosts: action.playload
      }
    }

    case types.SET_CURRENT_POSTS: {
      return {
        ...state,
        currentPosts: action.playload
      }
    }

    case types.SET_POSTS_TYPES_SUCCESS:
    {
      return {
        ...state,
        postsTypes: action.playload
      }
    }
    case types.UPDATE_CURRENT_POSTS_TYPES_SUCCESS:
    {
      return {
        ...state,
        currentPostsTypes: action.playload
      }
    }
    case types.SET_CURRENT_POSTS_ORDER:
    {
      return {
        ...state,
        currentPostsOrder: action.playload
      }
    }

    case types.SET_HIDE_POSTS_FROM_CURRENT_MENU:
    {
      return {
        ...state,
        hidePostsFromCurrentMenu: !state.hidePostsFromCurrentMenu
      }
    }

    case types.SET_POSTS_SORT:
    {
      return {
        ...state,
        postsSortUp: !state.postsSortUp
      }
    }

    default:
      return state
  }
}

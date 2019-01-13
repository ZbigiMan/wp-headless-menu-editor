import * as types from '../$constants/posts-action-types';

const initialState = {
    postsTypes: [],
    currentPostsTypes: [],
    postsFilters: [{
            value: 'post_date',
            text: 'Date',
        },
        {
            value: 'post_title',
            text: 'Title',
        }
    ],
    currentPostsFilter: 'post_date',
    postsSortUp: false,
    hidePostsFromCurrentMenu: false,
    allPosts: [],
    currentPosts: [],
    currentPostsLoading: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_POSTS_TYPES:
            {
                return { ...state,
                    postsTypes: action.playload
                };
            }
        case types.SET_CURRENT_POSTS_TYPES:
            {
                return { ...state,
                    currentPostsTypes: action.playload
                };
            }
        case types.UPDATE_CURRENT_POSTS_TYPES:
            {
                return { ...state,
                    currentPostsTypes: action.playload
                };
            }
        case types.SELECT_CURRENTS_POSTS_FILTER:
            {
                return { ...state,
                    currentPostsFilter: action.playload
                }
            }

        case types.SWITCH_HIDE_POSTS_FROM_CURRENT_MENU:
            {
                return { ...state,
                    hidePostsFromCurrentMenu: !state.hidePostsFromCurrentMenu
                }
            }

        case types.SWITCH_POSTS_SORT:
            {
                return { ...state,
                    postsSortUp: !state.postsSortUp
                }
            }

        default:
            return state;
    }
}
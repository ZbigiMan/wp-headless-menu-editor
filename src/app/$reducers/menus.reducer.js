import * as types from '../$constants/menus-action-types';

const initialState = {
    menus: [],
    currentMenuId: '',
    currentMenuData: [],
    currentMenuDataLoading: false,
    currentMenuDataSaving: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case types.SET_MENUS:
            {
                return { ...state,
                    menus: action.playload
                };
            }
        case types.SET_CURRENT_MENU_ID:
            {
                return { ...state,
                    currentMenuId: action.playload
                }
            }
        case types.GET_MENU_DATA_STARTED:
            {
                return { ...state,
                    currentMenuDataLoading: true,
                }
            }
        case types.GET_MENU_DATA_SUCCESS:
            {
                return { ...state,
                    currentMenuDataLoading: false,
                    currentMenuData: action.playload
                }
            }
        case types.SAVE_MENU_DATA_STARTED: {
            return { ...state,
                currentMenuDataSaving: true,
                currentMenuData: action.playload
            }
        }
        case types.SAVE_MENU_DATA_SUCCESS: {
            return { ...state,
                currentMenuDataSaving: false,
            }
        }
        default:
            return state;
    }
};
import menusService from '../$services/menus.service';
import * as types from '../$constants/menus-action-types';

export function setMenus(data) {
    return {
        type: types.SET_MENUS,
        playload: menusService.fetchMenus(data)
    }
}

export function selectMenu(menuId) {
    return dispatch => {
        dispatch(setMenuId(menuId));
        dispatch(getMenuData(menuId));
    }
}

export function saveMenuData(menuId, menuData) {
    return dispatch => {
        dispatch(saveMenuDataStarted(menuData));
        menusService.saveMenuData(menuId, menuData).then((res) => {
            dispatch(saveMenuDataSuccess(res));
        });
    }
}

const setMenuId = (menuId) => {
    return {
        type: types.SET_CURRENT_MENU_ID,
        playload: menuId
    }
}

const getMenuData = (menuId) => {
    return dispatch => {
        dispatch(getMenuDataStarted());
        menusService.getMenuData(menuId).then((res) => {
            dispatch(getMenuDataSuccess(res));
        });
    }
}

const getMenuDataStarted = () => {
    return {
        type: types.GET_MENU_DATA_STARTED,
    }
}

const getMenuDataSuccess = (data) => {
    return {
        type: types.GET_MENU_DATA_SUCCESS,
        playload: data
    }
}

const saveMenuDataStarted = (data) => {
    return {
        type: types.SAVE_MENU_DATA_STARTED,
        playload: data,
    }
}

const saveMenuDataSuccess = (res) => {
    return {
        type: types.SAVE_MENU_DATA_SUCCESS,
        playload: res
    }
}
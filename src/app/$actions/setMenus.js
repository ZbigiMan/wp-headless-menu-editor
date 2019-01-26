import menusService from '../$services/menus.service';
export function setMenus(data) {
    return {
        type: types.SET_MENUS,
        playload: menusService.fetchMenus(data)
    };
}

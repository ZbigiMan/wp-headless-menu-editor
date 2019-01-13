import { setMenus}  from './menus.actions';
import menusMocs from '../mocs/mocs';
import * as types from '../$constants/menus-action-types';
import Menu from '../$models/menu.model';

describe('Action: setMenus', () => {
    const data = menusMocs;
    it('should return ' + types.SET_MENUS + ' action', () => {
        const expectedAction = {
            type: types.SET_MENUS,
            playload: data
        };
        expect(setMenus(menusMocs)).toEqual(expectedAction);
    });
    it(types.SET_MENUS + ' playload should be the Array<Menu>', () => {
        const playload = setMenus(menusMocs).playload;
        let matches = 0;
        playload.forEach(item => {
            if (item instanceof Menu) {
                matches++;
            }
        });
        expect(matches).toEqual(playload.length);
    });
})
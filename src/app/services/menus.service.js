import Ajax from '../classes/ajax'
import Menu from '../models/menu.model'
import MenuItem from '../models/menu-item.model'
import config from '../config'

class MenusService {
  constructor () {
    this.$ajax = new Ajax()
  }

  fetchMenus (menus) {
    return menus.map(menu => {
      return new Menu(menu)
    })
  }

  getMenuData (menuId) {
    return this.$ajax.post({
      url: config.apiUrl,
      data: {
        action: 'get_menu_items',
        menu_id: menuId
      }
    }).then(res => {
      return res.map(item => {
        return new MenuItem(item)
      })
    })
  }

  saveMenuData (menuId, menuData) {
    return this.$ajax.post({
      url: config.apiUrl,
      data: {
        action: 'save_menu',
        menu_id: menuId,
        menu_data: JSON.stringify(menuData)
      }
    }).then(res => {
      return res
    })
  }
}

const menusService = new MenusService()
export default menusService

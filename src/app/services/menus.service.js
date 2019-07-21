import AjaxService from './ajax.service'
import Menu from '../models/menu.model'
import MenuItem from '../models/menu-item.model'
import config from '../config'

class MenusService {
  constructor () {
    this.$ajax = new AjaxService()
  }

  fetchMenus (menus) {
    return menus.map(menu => {
      return new Menu(menu)
    })
  }

  fetchMenuData (menuData) {
    return menuData.map(item => {
      return new MenuItem(item)
    })
  }

  async getMenuData (menuId) {
    return this.$ajax.post({
      url: config.apiUrl,
      data: {
        action: 'get_menu_items',
        menu_id: menuId
      }
    }).then(res => {
      return this.fetchMenuData(res)
    })
  }

  async saveMenuData (menuId, menuData) {
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

  isPostInMenu (objectId, menuData) {
    return menuData.find((item) => {
      return item.object_id === objectId
    })
  }
}

const menusService = new MenusService()
export default menusService

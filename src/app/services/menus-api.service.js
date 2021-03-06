import AjaxService from './ajax.service'
import config from '../config'

class MenusApiService {
  constructor () {
    this.$ajax = new AjaxService()
  }

  async getMenus (attrs) {
    let _url = config.restUrl + 'menus/'
    if (attrs && attrs.id) {
      _url += attrs.id
    }
    return this.$ajax.get({
      url: _url
    }).then(res => {
      return res
    })
  }
}

const menusApiService = new MenusApiService()
export default menusApiService

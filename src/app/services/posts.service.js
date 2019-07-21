import AjaxService from './ajax.service'
import config from '../config'
import MenuItem from '../models/menu-item.model'

class PostsService {
  constructor () {
    this.$ajax = new AjaxService()
  }

  async getPosts (types) {
    return this.$ajax.post({
      url: config.apiUrl,
      data: {
        action: 'get_posts',
        types: JSON.stringify(types)
      }
    }).then(res => {
      return res.map(item => {
        return new MenuItem(item)
      })
    })
  }
}

const postsService = new PostsService()
export default postsService

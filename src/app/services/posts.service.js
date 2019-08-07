import AjaxService from './ajax.service'
import config from '../config'
import MenuItem from '../models/menu-item.model'

class PostsService {
  constructor () {
    this.$ajax = new AjaxService()
  }

  parsePostsData (postsData) {
    return postsData.map(item => {
      return new MenuItem(item)
    })
  }

  async getPosts (types) {
    return this.$ajax.post({
      url: config.apiUrl,
      data: {
        action: 'get_posts',
        types: JSON.stringify(types)
      }
    }).then(res => {
      return this.parsePostsData(res)
    })
  }
}

const postsService = new PostsService()
export default postsService

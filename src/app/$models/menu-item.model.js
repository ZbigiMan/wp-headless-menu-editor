export default class MenuItem {
  constructor (data) {
    this.ID = data.ID
    this.attr_title = data.attr_title
    this.classes = data.classes
    this.db_id = data.db_id
    this.description = data.description
    this.menu_item_parent = data.menu_item_parent
    this.object = data.object
    this.object_id = data.object_id.toString()
    this.post_parent = data.post_parent
    this.post_title = data.post_title
    this.target = data.target
    this.title = data.title
    this.type = data.type
    this.type_label = data.type_label
    this.url = data.url
    this.xfn = data.xfn
    this._invalid = data._invalid
    this.post_date = data.post_date
    this.post_modified = data.post_modified
  }
}

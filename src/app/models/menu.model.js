export default class Menu {
  constructor (data) {
    this.term_id = data.term_id
    this.name = data.name
    this.slug = data.slug
    this.term_group = data.term_group
    this.term_taxonomy_id = data.term_taxonomy_id
    this.taxonomy = data.taxonomy
    this.description = data.description
    this.parent = data.parent
    this.count = data.count
    this.filter = data.filter
  }
}

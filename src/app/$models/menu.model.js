export default class Menu {
    constructor(data) {

        this.count = data.count;
        this.description = data.description;
        this.filter = data.filter;
        this.name = data.name;
        this.parent = data.parent;
        this.slug = data.slug
        this.taxonomy = data.taxonomy;
        this.term_group = data.term_group;
        this.term_id = data.term_id;
        this.term_taxonomy_id = data.term_taxonomy_id;

    }
}

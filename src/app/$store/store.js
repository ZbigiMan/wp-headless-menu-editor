import { observable, toJS, action } from 'mobx';
import * as _ from 'lodash';
import MenusService from '../$services/menus.service';
import postsService from '../$services/posts.service';

class Store {

    @observable
    state = {
        config: {},
        data: {}
    }

    getState() {
        return toJS(this.state);
    }

    @action
    setInitialState(initialState) {
        this.state.config.apiUrl = initialState.config.apiUrl;
        this.state.data.menus = initialState.data.menus;
        this.state.data.currentMenuId = initialState.data.currentMenuId;
        this.state.data.currentMenuData = [];
        this.state.data.currentMenuDataLoading = false;
        this.state.data.postsTypes = initialState.data.postsTypes;
        this.state.data.currentPostsTypes = initialState.data.postsTypes.map((item) => {
            return item.value;
        });
        this.state.data.postsOrder = [
            {
                value: 'post_date',
                text: 'Date',
            },
            // {
            //     value: 'post_modified',
            //     text: 'Modified',
            // },
            {
                value: 'post_title',
                text: 'Title',
            }
        ];
        this.state.data.currentPostsOrder = 'post_date';
        this.state.data.postsSortUp = false;
        this.state.data.hidePostsFromCurrentMenu = false;
        this.state.data.allPosts = [];
        this.state.data.currentPosts = [];
        this.state.data.currentPostsLoading = false;
    }

    @action
    selectMenu(id) {
        this.state.data.currentMenuId = id;
    }

    @action
    selectPostsTypes(data) {
        this.state.data.currentPostsTypes = data;
        this.getPosts(this.state.data.currentPostsTypes);
    }

    @action
    selectPostsOrder(data) {
        this.state.data.currentPostsOrder = data;
        this.state.data.currentPosts = this.sortPosts();
    }

    @action
    sortPosts() {
        const state = this.getState();
        const posts = _.sortBy(state.data.currentPosts, ['post', state.data.currentPostsOrder]);
        if (!this.state.data.postsSortUp) {
            posts.reverse();
        }
        return posts;
    }

    @action
    switchPostsSort() {
        this.state.data.postsSortUp = !this.state.data.postsSortUp;
        const state = this.getState();
        state.data.currentPosts.reverse();
        this.state.data.currentPosts = state.data.currentPosts;
    }

    @action
    switchHidePostsFromCurrentManu() {
        this.state.data.hidePostsFromCurrentMenu = !this.state.data.hidePostsFromCurrentMenu;
        this.filterPosts();
    }

    @action
    hidePostsFromCurrentMenu() {
        const state = this.getState();
        if (state.data.hidePostsFromCurrentMenu) {
            state.data.currentPosts = state.data.allPosts.filter(post => {
                const isInMenu = state.data.currentMenuData.find(item => {
                    return parseInt(item.object_id) === parseInt(post.object_id);
                });
                if (!isInMenu) {
                    return post;
                }
            });
        }
        return state.data.currentPosts;
    }


    @action
    getMenuData(id) {
        this.state.data.currentMenuDataLoading = true;
        MenusService.getMenuData(this.state.config.apiUrl, id).then(data => {
            this.state.data.currentMenuDataLoading = false;
            this.state.data.currentMenuData = data;
            this.filterPosts();
        });
    }

    @action
    saveMenuData(id, data) {
        this.state.data.currentMenuData = data;
        return new Promise((resolve) => {
            MenusService.saveMenuData(this.state.config.apiUrl, id, data).then(res => {
                resolve(res);
            });
        });
    }

    @action
    getPosts(types) {
        this.state.data.currentPostsLoading = true;
        postsService.getPosts(this.state.config.apiUrl, types).then(data => {
            this.state.data.currentPostsLoading = false;
            this.state.data.allPosts = data;
            this.filterPosts();
        })
    }

    @action
    filterPosts() {
        this.state.data.currentPosts =  this.state.data.allPosts;
        this.state.data.currentPosts = this.sortPosts();
        this.state.data.currentPosts = this.hidePostsFromCurrentMenu();
    }
}

const store = new Store();
export default store;
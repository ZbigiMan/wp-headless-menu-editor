import React from 'react';
import { connect } from 'react-redux';
import { reaction } from 'mobx';
import { Grid, Segment, Divider, Dropdown, Label, Button, Icon, Checkbox } from 'semantic-ui-react'
import {
    updateCurrentPostsTypes,
    selectCurrentPostsFilter,
    switchHidePostsFromCurrentMenu,
    switchPostsSort
} from '../$actions/posts.actions'
import store from '../$store/store';

@connect((store) => {
    return {
        menus: store.menus.menus,
        currentMenuId: store.menus.currentMenuId,
        postsTypes: store.posts.postsTypes,
        currentPostsTypes: store.posts.currentPostsTypes,
        postsFilters: store.posts.postsFilters,
        currentPostsFilter: store.posts.currentPostsFilter,
        hidePostsFromCurrentMenu: store.posts.hidePostsFromCurrentMenu,
        postsSortUp: store.posts.postsSortUp
    }
})
export default class PostsSelect extends React.Component {

    // init() {
    //     this.state = store.getState();
    //     console.log(this.props.postsSortUp);

    //     reaction(
    //         () => store.state.data.currentPostsTypes,
    //         () => {
    //             this.setState(store.getState());
    //             this.forceUpdate();
    //         });

    //     reaction(
    //         () => store.state.data.currentPostsFilter,
    //         () => {
    //             this.setState(store.getState());
    //             this.forceUpdate();
    //         });

    //     reaction(
    //         () => store.state.data.postsSortUp,
    //         () => {
    //             this.setState(store.getState());
    //             this.forceUpdate();
    //         });

    //     reaction(
    //         () => store.state.data.currentMenuId,
    //         () => {
    //             this.setState(store.getState());
    //             this.forceUpdate();
    //         }
    //     )

    //     reaction(
    //         () => store.state.data.hidePostsFromCurrentMenu,
    //         () => {
    //             this.setState(store.getState());
    //             this.forceUpdate();
    //         }
    //     )
    // }

    selectPostsType (e, data) {
        this.props.dispatch(updateCurrentPostsTypes(data.value));
    }

    selectPostsFilter (e, data) {
        this.props.dispatch(selectCurrentPostsFilter(data.value));
    }

    switchPostsSort(e, data) {
        this.props.dispatch(switchPostsSort());
    }

    switchHidePostsFromCurrentManu(e, data) {
        this.props.dispatch(switchHidePostsFromCurrentMenu());
    }

    render() {
        return (
            <div className="posts-types-select">
                <Segment secondary>
                    <Grid>
                        <Grid.Column width={10}>
                            <h5>Select posts</h5>
                        </Grid.Column>
                        <Grid.Column width={6} textAlign='right'>
                        {this.props.menus.length > 0 &&
                            < Checkbox
                                checked={this.props.hidePostsFromCurrentMenu}
                                onChange = {this.switchHidePostsFromCurrentManu.bind(this)}
                                label = {'Not in "' + this.props.menus.find(menu => {
                                            return menu.term_id === this.props.currentMenuId;
                                        }).name + '"'
                                    }
                            />
                        }
                        </Grid.Column>
                    </Grid>
                    <Divider></Divider>
                    <Grid>
                        <Grid.Column width={8}>
                            <Label>Select Type:</Label>
                            <Dropdown selection
                                      fluid
                                      multiple={true}
                                      options={this.props.postsTypes}
                                      onChange={this.selectPostsType.bind(this)}
                                      value={this.props.currentPostsTypes}
                                      placeholder="Select type">
                            </Dropdown>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Label>Order by:</Label>
                            <Dropdown selection
                                      fluid
                                      options={this.props.postsFilters}
                                      value = {this.props.currentPostsFilter}
                                      onChange={this.selectPostsFilter.bind(this)}
                                      placeholder="Order by:">
                            </Dropdown>
                        </Grid.Column>
                        <Grid.Column width={2} textAlign='center'>
                            <Label>Sort:</Label>
                            <Button basic icon onClick={this.switchPostsSort.bind(this)}>
                                {this.props.postsSortUp ?
                                    (<Icon name='sort up' />) : (<Icon name='sort down' />)
                                }
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        )
    }
}

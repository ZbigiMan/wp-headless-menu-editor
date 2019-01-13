import React from 'react';
import { reaction } from 'mobx';
import { Segment, Dimmer, Loader, Label, Message } from 'semantic-ui-react'
import store from '../$store/store';

class PostsList extends React.Component {

    constructor() {
        super();
        this.state = store.getState();
        this.init();
    }

    init() {
        store.getPosts(this.state.data.currentPostsTypes);

        reaction(
            () => store.state.data.currentPostsLoading,
            () => {
                this.setState(store.getState());
                this.forceUpdate();
            }
        );

        reaction(
            () => store.state.data.currentPosts,
            () => {
                this.setState(store.getState());
                this.forceUpdate();
            }
        );
    }


    render () {
        return (
            <Segment className='posts-list'>
                {this.state.data.currentPostsLoading &&
                    <ul className='postsList'>
                        <Dimmer active inverted>
                            <Loader inverted></Loader>
                        </Dimmer>
                    </ul>
                }
                {this.state.data.currentPosts && this.state.data.currentPosts.length === 0 &&
                    <Message content='Nothing to show, please change the select criteria.'
                    />
                }
                {this.state.data.currentPosts && this.state.data.currentPosts.length > 0 && !this.state.data.currentPostsLoading &&
                <ul className='postsList'>
                    {this.state.data.currentPosts.map(item =>
                        <li className="menu-item"
                            key={'li-menu-item-segment' + item.object_id}
                        >
                            <Segment className="menu-item-segment"
                                        object_id={'menu-item-segment' + item.object_id}
                                        key={'menu-item-segment' + item.object_id}
                                >
                                <div className="menu-item-segment-content"
                                        object_id={'menu-item-segment-content' + item.object_id}
                                        key={'menu-item-segment-content' + item.object_id}
                                >
                                    <span className="menu-item-bar">{item.title}</span>
                                    <Label basic size='tiny'>
                                        {item.type_label}
                                    </Label>

                                </div>
                            </Segment>
                        </li>
                    )}
                </ul>}
            </Segment>
        );
    }
}

export default PostsList;
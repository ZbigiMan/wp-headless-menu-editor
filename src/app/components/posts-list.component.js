import React from 'react';
import { connect } from 'react-redux';
import { Segment, Dimmer, Loader, Label, Message } from 'semantic-ui-react'

@connect((store) => {
    return {
        postsLoading: store.posts.postsLoading,
        currentPosts: store.posts.currentPosts
    };
})
class PostsList extends React.Component {

    render () {
        
        return (
            <Segment className='posts-list'>
                {this.props.postsLoading &&
                    <ul className='postsList'>
                        <Dimmer active inverted>
                            <Loader inverted></Loader>
                        </Dimmer>
                    </ul>
                }
                {this.props.currentPosts && this.props.currentPosts.length === 0 &&
                    <Message content='Nothing to show, please change the select criteria.'
                    />
                }
                {this.props.currentPosts && this.props.currentPosts.length > 0 && !this.props.currentPostsLoading &&
                <ul className='postsList'>
                    {this.props.currentPosts.map(item =>
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
import React from 'react'
import { connect } from 'react-redux'
import { Segment, Dimmer, Loader, Message, Divider } from 'semantic-ui-react'
import MenuItem from './menu-item'
import { Trans } from 'react-i18next'

@connect((store) => {
  return {
    postsLoading: store.posts.postsLoading,
    currentPosts: store.posts.currentPosts,
    currentMenuId: store.menus.currentMenuId,
    currentMenuName: store.menus.currentMenuName,
    currentManuData: store.menus.currentMenuData,
    currentMenuDataLoading: store.menus.currentMenuDataLoading,
    currentMenuDataSaving: store.menus.currentMenuDataSaving
  }
})
class PostsList extends React.Component {
  render () {
    return (
      <Segment className='posts-list'>
        <h5><Trans>Posts List</Trans></h5>
        <Divider />
        {this.props.postsLoading &&
        <ul>
          <Dimmer active inverted>
            <Loader inverted />
          </Dimmer>
        </ul>
        }
        {this.props.currentPosts && this.props.currentPosts.length === 0 &&
        <Message content='Nothing to show, please change the select criteria.'
        />
        }
        {this.props.currentPosts && this.props.currentPosts.length > 0 && !this.props.currentPostsLoading &&
        <ul>
          {this.props.currentPosts.map(item =>
            <li className='menu-item'
              key={'li-menu-item-segment' + item.object_id}
            >
              <MenuItem item={item} prefix='postsList' />
            </li>
          )}
        </ul>}
      </Segment>
    )
  }
}

export default PostsList

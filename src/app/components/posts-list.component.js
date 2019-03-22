import React from 'react'
import { connect } from 'react-redux'
import { Segment, Dimmer, Loader, Message, Button } from 'semantic-ui-react'
import MenuItem from './menu-item.component'
import { addToMenu, saveMenuData, confirmRemoveFromMenu } from '../$actions/menus.actions'

@connect((store) => {
  return {
    postsLoading: store.posts.postsLoading,
    currentPosts: store.posts.currentPosts,
    currentMenuId: store.menus.currentMenuId,
    currentManuData: store.menus.currentMenuData,
    currentMenuDataLoading: store.menus.currentMenuDataLoading,
    currentMenuDataSaving: store.menus.currentMenuDataSaving
  }
})
class PostsList extends React.Component {
  addToMenu = (post) => {
    this.props.dispatch(addToMenu(post))
    this.props.dispatch(saveMenuData(this.props.currentMenuId, this.props.currentManuData, {
      reload: true
    }))
  }

  confirmRemoveFromMenu = (post) => {
    this.props.dispatch(confirmRemoveFromMenu({
      open: true,
      item: post
    }))
  }

  addRemoveButton = (post) => {
    let menuItem = this.props.currentManuData.find(item => {
      return item.object_id === post.object_id
    })

    if (menuItem) {
      return (
        <Button
          size='mini'
          loading={this.props.currentMenuDataLoading || this.props.currentMenuDataSaving}
          onClick={() => { this.confirmRemoveFromMenu(post) }}>Remove from tree
        </Button>
      )
    }

    return (
      <Button
        size='mini'
        loading={this.props.currentMenuDataLoading || this.props.currentMenuDataSaving}
        onClick={() => { this.addToMenu(post) }}>Add to tree
      </Button>
    )
  }

  render () {
    return (
      <Segment className='posts-list'>
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
              {this.addRemoveButton(item)}
            </li>
          )}
        </ul>}
      </Segment>
    )
  }
}

export default PostsList

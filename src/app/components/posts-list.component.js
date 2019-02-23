import React from 'react'
import { connect } from 'react-redux'
import { Segment, Dimmer, Loader, Label, Message, Button } from 'semantic-ui-react'
import MenuItemToolBox from './menu-item-toolbox.component'

@connect((store) => {
  return {
    postsLoading: store.posts.postsLoading,
    currentPosts: store.posts.currentPosts
  }
})
class PostsList extends React.Component {
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
              <Segment
                className='menu-item-segment'
                object_id={'menu-item-segment' + item.object_id}
                key={'menu-item-segment' + item.object_id}
              >
                <div
                  className='menu-item-segment-content'
                  object_id={'menu-item-segment-content' + item.object_id}
                  key={'menu-item-segment-content' + item.object_id}
                >
                  <span className='menu-item-bar'>{item.title}</span>
                  <Label basic size='tiny'>
                    {item.type_label}
                  </Label>
                  <MenuItemToolBox
                    item={item}
                    key={'MenuItemToolBox' + item.object_id}
                  />
                </div>
              </Segment>
              <Button size='mini'>Add to tree</Button>
            </li>
          )}
        </ul>}
      </Segment>
    )
  }
}

export default PostsList

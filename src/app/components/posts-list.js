import React from 'react'
import { connect } from 'react-redux'
import { Segment, Label, Dimmer, Loader, Message, Pagination } from 'semantic-ui-react'
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
  state = {
    activePage: 1,
    itemsOnPage: 5
  }

  getTotalPages = () => {
    return Math.ceil(this.props.currentPosts.length / this.state.itemsOnPage)
  }

  onChangePage = (e, { activePage }) => {
    this.setState({ activePage })
  }

  isOnPage = (index) => {
    let rangeMax = this.state.activePage * this.state.itemsOnPage
    let rangeMin = rangeMax - this.state.itemsOnPage
    return (index >= rangeMin && index < rangeMax)
  }

  render () {
    return (
      <Segment className='posts-list'>
        <Label
          size='large'
          color='blue'
          ribbon
          className='custom-label'
        >
          <Trans>Posts List</Trans>
        </Label>
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
          {this.props.currentPosts.map((item, index) =>
            this.isOnPage(index) &&
            <li className='menu-item'
              key={'li-menu-item-segment' + item.object_id}
            >
              <MenuItem item={item} prefix='postsList' />
            </li>
          )}
        </ul>}
        <Segment basic textAlign='center'>
          {this.getTotalPages() > 1 &&
          <Pagination
            totalPages={this.getTotalPages()}
            activePage={this.state.activePage}
            onPageChange={this.onChangePage}
            firstItem={null}
            lastItem={null}
            siblingRange={0}
            size='mini'
            secondary
          />}
        </Segment>
      </Segment>
    )
  }
}

export default PostsList

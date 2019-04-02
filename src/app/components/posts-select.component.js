import React from 'react'
import { connect } from 'react-redux'
import { Grid, Segment, Divider, Dropdown, Label, Button, Icon, Checkbox } from 'semantic-ui-react'
import {
  updateCurrentPostsTypes,
  selectCurrentPostsOrder,
  switchHidePostsFromCurrentMenu,
  switchPostsSort
} from '../$actions/posts.actions'
import { Trans, withTranslation } from 'react-i18next'

@connect((store) => {
  return {
    menus: store.menus.menus,
    currentMenuId: store.menus.currentMenuId,
    currentMenuName: store.menus.currentMenuName,
    postsTypes: store.posts.postsTypes,
    currentPostsTypes: store.posts.currentPostsTypes,
    postsOrder: store.posts.postsOrder,
    currentPostsOrder: store.posts.currentPostsOrder,
    hidePostsFromCurrentMenu: store.posts.hidePostsFromCurrentMenu,
    postsSortUp: store.posts.postsSortUp
  }
})
class PostsSelect extends React.Component {
  selectPostsType = (e, data) => {
    this.props.dispatch(updateCurrentPostsTypes(data.value))
  }

  selectPostsOrder = (e, data) => {
    this.props.dispatch(selectCurrentPostsOrder(data.value))
  }

  switchPostsSort = (e, data) => {
    this.props.dispatch(switchPostsSort())
  }

  switchHidePostsFromCurrentManu = (e, data) => {
    this.props.dispatch(switchHidePostsFromCurrentMenu())
  }

  render () {
    const { t } = this.props
    return (
      <div className='posts-types-select'>
        <Segment secondary>
          <Grid>
            <Grid.Column width={10}>
              <h5><Trans>Select posts</Trans>
                <small className='tip'><Icon name='hand point left outline' /><Trans>choose criteria</Trans></small>
              </h5>
            </Grid.Column>
            <Grid.Column width={6} textAlign='right'>
              {this.props.menus.length > 0 &&
                <Checkbox
                  checked={this.props.hidePostsFromCurrentMenu}
                  onChange={this.switchHidePostsFromCurrentManu}
                  label={t('Not in') + ' "' + this.props.currentMenuName + '"'}
                />
              }
            </Grid.Column>
          </Grid>
          <Divider />
          <Grid>
            <Grid.Column width={8}>
              <Label><Trans>Select type</Trans></Label>
              <Dropdown selection
                fluid
                multiple
                options={this.props.postsTypes}
                onChange={this.selectPostsType}
                value={this.props.currentPostsTypes}
                placeholder={t('Select type')}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Label><Trans>Order by</Trans></Label>
              <Dropdown selection
                fluid
                options={this.props.postsOrder}
                value={this.props.currentPostsOrder}
                onChange={this.selectPostsOrder}
                placeholder={t('Order by')}
              />
            </Grid.Column>
            <Grid.Column width={2} textAlign='center'>
              <Label><Trans>Sort</Trans></Label>
              <Button basic icon onClick={this.switchPostsSort}>
                {this.props.postsSortUp
                  ? (<Icon name='sort up' />) : (<Icon name='sort down' />)
                }
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default withTranslation()(PostsSelect)

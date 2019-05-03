import React from 'react'
import { connect } from 'react-redux'
import { Button, Popup } from 'semantic-ui-react'
import { addToMenu, saveMenuData, confirmRemoveFromMenu } from '../actions/menus.actions'
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
class MenuItemAddRemoveButton extends React.Component {
    addToMenu = () => {
      this.props.dispatch(addToMenu(this.props.post))
      this.props.dispatch(saveMenuData(this.props.currentMenuId, this.props.currentManuData, {
        reload: true
      }))
    }

    confirmRemoveFromMenu = () => {
      this.props.dispatch(confirmRemoveFromMenu({
        open: true,
        item: this.props.post
      }))
    }

    addRemoveButton = () => {
      let menuItem = this.props.currentManuData.find(item => {
        return item.object_id === this.props.post.object_id
      })

      if (menuItem) {
        return (
          <Popup trigger={
            <Button
              className='menuItemButton'
              icon='remove'
              disabled={this.props.currentMenuDataLoading || this.props.currentMenuDataSaving}
              onClick={() => { this.confirmRemoveFromMenu(this.props.post) }}
            />}
          >
            <Trans>Remove from</Trans> "{this.props.currentMenuName}"
          </Popup>
        )
      }

      return (
        <Popup trigger={
          <Button
            className='menuItemButton'
            icon='add'
            primary
            disabled={this.props.currentMenuDataLoading || this.props.currentMenuDataSaving}
            onClick={() => { this.addToMenu(this.props.post) }}
          />}
        >
          <Trans>Add to</Trans> "{this.props.currentMenuName}"
        </Popup>
      )
    }

    render () {
      return (this.addRemoveButton())
    }
}

export default MenuItemAddRemoveButton

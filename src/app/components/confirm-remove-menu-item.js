import React from 'react'
import { connect } from 'react-redux'
import { Confirm } from 'semantic-ui-react'
import { confirmRemoveFromMenu, removeFromMenu, saveMenuData } from '../$actions/menus.actions'

@connect((store) => {
  return {
    confirmRemoveMenuItem: store.menus.confirmRemoveMenuItem,
    currentMenuId: store.menus.currentMenuId,
    currentMenuData: store.menus.currentMenuData
  }
})
class ConfirmRemoveMenuItem extends React.Component {
  onCancel = () => {
    this.props.dispatch(confirmRemoveFromMenu({ open: false }))
  }

  onConfirm = () => {
    this.props.dispatch(confirmRemoveFromMenu({ open: false }))
    this.props.dispatch(removeFromMenu(this.props.confirmRemoveMenuItem.item))
    setTimeout(() => {
      this.props.dispatch(saveMenuData(this.props.currentMenuId, this.props.currentMenuData, {
        reload: true
      }), 0)
    })
  }

  render () {
    return (
      <Confirm
        open={this.props.confirmRemoveMenuItem.open}
        onCancel={this.onCancel}
        onConfirm={this.onConfirm}
      />
    )
  }
}

export default ConfirmRemoveMenuItem

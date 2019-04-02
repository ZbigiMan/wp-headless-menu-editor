import React from 'react'
import { connect } from 'react-redux'
import { Confirm } from 'semantic-ui-react'
import { confirmRemoveFromMenu, removeFromMenu, saveMenuData } from '../$actions/menus.actions'
import { withTranslation } from 'react-i18next'
@connect((store) => {
  return {
    confirmRemoveMenuItem: store.menus.confirmRemoveMenuItem,
    currentMenuId: store.menus.currentMenuId,
    currentMenuName: store.menus.currentMenuName,
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

  getContent = () => {
    if (!this.props.confirmRemoveMenuItem.item) {
      return
    }
    const { t } = this.props
    return t('Are You sure You want to remove') +
      ' "' + this.props.confirmRemoveMenuItem.item.title + '" ' +
      t('from') + ' "' + this.props.currentMenuName + ' "?'
  }

  render () {
    return (
      <Confirm
        open={this.props.confirmRemoveMenuItem.open}
        content={this.getContent()}
        onCancel={this.onCancel}
        onConfirm={this.onConfirm}
      />
    )
  }
}

export default withTranslation()(ConfirmRemoveMenuItem)

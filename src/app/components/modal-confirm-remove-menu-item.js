import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'
import { confirmRemoveFromMenu, removeFromMenu, saveMenuData } from '../_redux-actions/menus.actions'
import { Trans, withTranslation } from 'react-i18next'
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

  getHeader = () => {
    if (!this.props.confirmRemoveMenuItem.item) {
      return
    }
    const { t } = this.props
    return t('Are You sure You want to remove')
  }

  getContent = () => {
    if (!this.props.confirmRemoveMenuItem.item) {
      return
    }
    const { t } = this.props
    return ' "' + this.props.confirmRemoveMenuItem.item.title + '" ' +
      t('from') + ' "' + this.props.currentMenuName + ' "?'
  }

  render () {
    return (
      <Modal
        open={this.props.confirmRemoveMenuItem.open}
      >
        <Modal.Header>
          {this.getHeader()}
        </Modal.Header>
        <Modal.Content>
          <h4>{this.getContent()}</h4>
        </Modal.Content>
        <Modal.Actions>
          <Button basic onClick={this.onCancel}><Trans>No</Trans></Button>
          <Button primary onClick={this.onConfirm}><Trans>Yes</Trans></Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withTranslation()(ConfirmRemoveMenuItem)

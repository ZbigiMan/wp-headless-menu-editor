import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Segment, Icon } from 'semantic-ui-react'
import { confirmRemoveFromMenu, removeFromMenu, saveMenuData } from '../_redux-actions/menus.actions'
import { Trans, withTranslation } from 'react-i18next'
@connect((store) => {
  return {
    confirmRemoveMenuItemModal: store.menus.confirmRemoveMenuItemModal,
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
    this.props.dispatch(removeFromMenu(this.props.confirmRemoveMenuItemModal.item))
    setTimeout(() => {
      this.props.dispatch(saveMenuData(this.props.currentMenuId, this.props.currentMenuData, {
        reload: true
      }), 0)
    })
  }

  getHeader = () => {
    if (!this.props.confirmRemoveMenuItemModal.item) {
      return
    }
    return (<Trans>Are you sure?</Trans>)
  }

  getContent = () => {
    if (!this.props.confirmRemoveMenuItemModal.item) {
      return
    }
    return (
      <React.Fragment>
        <Trans>Remove</Trans>&nbsp;
        <strong>"{this.props.confirmRemoveMenuItemModal.item.title}"</strong>&nbsp;
        <Trans>from</Trans>&nbsp;
        <strong>"{this.props.currentMenuName}"</strong>?
      </React.Fragment>)
  }

  render () {
    return (
      <Modal
        closeIcon={<Icon name='close' onClick={this.onCancel} />}
        open={this.props.confirmRemoveMenuItemModal.open}
      >
        <Modal.Header>
          {this.getHeader()}
        </Modal.Header>
        <Modal.Content>
          {this.getContent()}
        </Modal.Content>
        <Modal.Actions>
          <Segment basic textAlign='center'>
            <Button basic onClick={this.onCancel}><Trans>No</Trans></Button>
            <Button primary onClick={this.onConfirm}><Trans>Yes</Trans></Button>
          </Segment>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withTranslation()(ConfirmRemoveMenuItem)

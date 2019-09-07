import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Segment, Icon } from 'semantic-ui-react'
import { deleteMenu, modalConfirmDeleteMenuOpenClose } from '../_redux-actions/menus.actions'
import { Trans, withTranslation } from 'react-i18next'

@connect((store) => {
  return {
    confirmRemoveMenuModal: store.menus.confirmRemoveMenuModal,
    currentMenuName: store.menus.currentMenuName,
    currentMenuId: store.menus.currentMenuId
  }
})
class ConfirmRemoveMenu extends React.Component {
  onCancel = () => {
    this.props.dispatch(modalConfirmDeleteMenuOpenClose(false))
  }
  onConfirm = () => {
    this.props.dispatch(deleteMenu(
      this.props.currentMenuId
    ))
  }
  render () {
    return (
      <Modal
        closeIcon={<Icon name='close' onClick={this.onCancel} />}
        open={this.props.confirmRemoveMenuModal.open}
      >
        <Modal.Header>
          <Trans>Are you sure?</Trans>
        </Modal.Header>
        <Modal.Content>
          <Trans>Remove</Trans> <strong>"{this.props.currentMenuName}"</strong> menu?
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

export default withTranslation()(ConfirmRemoveMenu)

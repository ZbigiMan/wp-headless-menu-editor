import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'
// import { openCloseMenuItemEditor } from '../$actions/common.actions'
import { Trans, withTranslation } from 'react-i18next'
@connect((store) => {
  return {
    menuItemEditor: store.common.menuItemEditor,
    currentMenuId: store.menus.currentMenuId,
    currentMenuName: store.menus.currentMenuName,
    currentMenuData: store.menus.currentMenuData
  }
})
class ModalMenuItemEditor extends React.Component {
  render () {
    return (
      <Modal open={this.props.menuItemEditor.open}>
        <Modal.Header>Modal MenuItemEditor</Modal.Header>
        <Modal.Content>
            Content
        </Modal.Content>
        <Modal.Actions>
          <Button basic><Trans>Cancel</Trans></Button>
          <Button primary><Trans>Save</Trans></Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withTranslation()(ModalMenuItemEditor)

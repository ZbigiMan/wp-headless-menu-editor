import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Input, Label, Form, Divider } from 'semantic-ui-react'
import { openCloseMenuItemEditor } from '../_redux-actions/common.actions'
import { Trans, withTranslation } from 'react-i18next'
import { saveMenuData } from '../_redux-actions/menus.actions'

@connect((store) => {
  return {
    menuItemEditor: store.common.menuItemEditor,
    currentMenuId: store.menus.currentMenuId,
    currentMenuName: store.menus.currentMenuName,
    currentMenuData: store.menus.currentMenuData,
    currentMenuDataLoading: store.menus.currentMenuDataLoading,
    currentMenuDataSaving: store.menus.currentMenuDataSaving
  }
})
class ModalMenuItemEditor extends React.Component {
  onCancel = () => {
    this.props.dispatch(openCloseMenuItemEditor({ open: false }))
  }

  renameMenuItemOnChange = (e) => {
    this.props.menuItemEditor.item.title = e.target.value
  }

  renameMenuItemOnSubmit = () => {
    this.props.dispatch(saveMenuData(
      this.props.currentMenuId,
      this.props.currentMenuData,
      {
        reload: true
      }))
  }

  getHeader = () => {
    if (!this.props.menuItemEditor.item) {
      return
    }

    const { t } = this.props
    return t('Editing') + ' "' + this.props.menuItemEditor.item.title + '"'
  }

  getRenameMenuItem = () => {
    if (!this.props.menuItemEditor.item) {
      return
    }

    const isPostInMenu = this.props.currentMenuData.find((item) => {
      return item.object_id === this.props.menuItemEditor.item.object_id
    })
    if (isPostInMenu) {
      return (
        <Form onSubmit={this.renameMenuItemOnSubmit}>
          <Form.Field>
            <Label>Rename Menu Item</Label>
            <Input
              onChange={this.renameMenuItemOnChange}
              action={
                <Button
                  primary
                  type='submit'
                  disabled={this.props.currentMenuDataLoading || this.props.currentMenuDataSaving}
                >
                  <Trans>Save</Trans>
                </Button>
              }
              defaultValue={this.props.menuItemEditor.item.title}
            />
          </Form.Field>
        </Form>
      )
    }
  }

  getEditSource = () => {
    return (
      <Button>Eidit Source</Button>
    )
  }

  getContent = () => {
    if (!this.props.menuItemEditor.item) {
      return
    }
    return (<React.Fragment>
      {this.getRenameMenuItem()}
      <Divider />
      {this.getEditSource()}</React.Fragment>)
  }

  render () {
    return (
      <Modal open={this.props.menuItemEditor.open}>
        <Modal.Header>
          {this.getHeader()}
        </Modal.Header>
        <Modal.Content>
          {this.getContent()}
        </Modal.Content>
        <Modal.Actions>
          <Button basic onClick={this.onCancel}><Trans>Close</Trans></Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withTranslation()(ModalMenuItemEditor)

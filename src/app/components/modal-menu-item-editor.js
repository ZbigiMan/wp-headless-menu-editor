import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Input, Label, Form, Segment, Icon } from 'semantic-ui-react'
import { openCloseMenuItemEditor } from '../_redux-actions/common.actions'
import { Trans, withTranslation } from 'react-i18next'
import config from '../config'
import { saveMenuData } from '../_redux-actions/menus.actions'

@connect((store) => {
  return {
    menuItemEditor: store.common.menuItemEditor,
    currentMenuId: store.menus.currentMenuId,
    currentMenuName: store.menus.currentMenuName,
    currentMenuData: store.menus.currentMenuData,
    currentMenuDataLoading: store.menus.currentMenuDataLoading,
    currentMenuDataSaving: store.menus.currentMenuDataSaving,
    postTypes: store.posts.postTypes
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

  getDetails = () => {
    if (!this.props.menuItemEditor.item) {
      return
    }
    return (
      <div>
        <Label><Trans>Type</Trans>:</Label>
        <span>
          &nbsp;
          {this.props.postTypes.find(type => {
            return type.value === this.props.menuItemEditor.item.object
          }).text}
          {}
          &nbsp;
        </span>
        <Label><Trans>Title</Trans>:</Label>
        <span>&nbsp;{this.props.menuItemEditor.item.post_title}</span>
      </div>
    )
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
        <Segment>
          <Form onSubmit={this.renameMenuItemOnSubmit}>
            <Form.Field>
              <Input
                label={
                  <Label color='blue'>
                    <Trans>Rename Menu Item</Trans>:
                  </Label>
                }
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
        </Segment>
      )
    }
  }

  getEditSource = () => {
    const editPostLink = config.editPostPath.replace('{postId}', this.props.menuItemEditor.item.object_id)
    return (
      <Segment textAlign='center'>
        <a href={editPostLink} target='_blank'><Button primary basic><Trans>Open in content editor</Trans></Button></a>
      </Segment>
    )
  }

  getContent = () => {
    if (!this.props.menuItemEditor.item) {
      return
    }
    return (<React.Fragment>
      {this.getRenameMenuItem()}
      {this.getEditSource()}</React.Fragment>)
  }

  render () {
    return (
      <Modal
        closeIcon={<Icon name='close' onClick={this.onCancel} />}
        open={this.props.menuItemEditor.open}
      >
        <Modal.Header>
          {this.getHeader()}
        </Modal.Header>
        <Modal.Content>
          {this.getDetails()}
          {this.getContent()}
        </Modal.Content>
        <Modal.Actions>
          <Segment basic textAlign='center'>
            <Button basic onClick={this.onCancel}><Trans>Close</Trans></Button>
          </Segment>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withTranslation()(ModalMenuItemEditor)

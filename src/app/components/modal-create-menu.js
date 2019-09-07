import React from 'react'
import { connect } from 'react-redux'
import { Trans, withTranslation } from 'react-i18next'
import { Modal, Button, Segment, Icon, Form, Input, Label } from 'semantic-ui-react'
import { modalCreateMenuOpen, createMenu } from '../_redux-actions/menus.actions'

@connect((store) => {
  return {
    createNewMenuModal: store.menus.createNewMenuModal
  }
})
class ModalCreateMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuName: ''
    }
  }

  onCancel = () => {
    this.props.dispatch(modalCreateMenuOpen(false))
  }

  menuNameOnChange = (e) => {
    this.state.menuName = e.target.value
  }

  createMenu = () => {
    this.props.dispatch(createMenu(this.state.menuName))
  }

  render () {
    return (
      <Modal
        closeIcon={<Icon name='close' onClick={this.onCancel} />}
        open={this.props.createNewMenuModal.open}
      >
        <Modal.Header>
          <Trans>Create new</Trans> Menu
        </Modal.Header>
        <Modal.Content>
          <Segment basic>
            <Form onSubmit={this.createMenu}>
              <Form.Field>
                <Input
                  autoFocus
                  label={
                    <Label>
                      <Trans>Menu Name</Trans>:
                    </Label>
                  }
                  onChange={this.menuNameOnChange}
                  action={
                    <Button
                      primary
                      type='submit'
                    >
                      <Trans>Create Menu</Trans>
                    </Button>
                  }
                />
              </Form.Field>
            </Form>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Segment basic textAlign='center'>
            <Button basic onClick={this.onCancel}><Trans>Cancel</Trans></Button>
          </Segment>
        </Modal.Actions>
      </Modal>
    )
  }
}
export default withTranslation()(ModalCreateMenu)

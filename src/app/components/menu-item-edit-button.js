import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { openCloseMenuItemEditor } from '../_redux-actions/common.actions'
import { Trans } from 'react-i18next'

@connect((store) => {
  return {
    menuItemEditor: store.common.menuItemEditor
  }
})
class MenuItemEditButton extends React.Component {
  handleOnClick = () => {
    this.props.dispatch(openCloseMenuItemEditor({
      mode: this.props.menuItemEditorMode,
      open: true
    }))
  }

  render () {
    return (
      <Popup trigger={
        <Button
          className='menuItemButton'
          icon
          onClick={this.handleOnClick}
        >
          <Icon color='black' name='edit' />
        </Button>
      }>
        <Trans>Edit</Trans> "{this.props.item.title}"
      </Popup>

    )
  }
}

export default MenuItemEditButton

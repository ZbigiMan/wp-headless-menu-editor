import React from 'react'
import { connect } from 'react-redux'
import { Segment, Label, Dropdown, Button, Divider } from 'semantic-ui-react'
import { selectMenu, modalCreateMenuOpen, modalConfirmDeleteMenuOpenClose } from '../_redux-actions/menus.actions'
import { Trans } from 'react-i18next'

@connect((store) => {
  return {
    menus: store.menus.menus,
    currentMenuId: store.menus.currentMenuId,
    currentMenuName: store.menus.currentMenuName,
    currentMenuDataLoading: store.menus.currentMenuDataLoading
  }
})
class MenusSelect extends React.Component {
  selectMenu = (e, data) => {
    const menuId = parseInt(data.value)
    this.props.dispatch(selectMenu(menuId))
  }

  createMenu = () => {
    this.props.dispatch(modalCreateMenuOpen(true))
  }

  deleteMenu = () => {
    this.props.dispatch(modalConfirmDeleteMenuOpenClose(true))
  }

  renderLabel = label => ({
    color: 'blue',
    content: `Customized label - ${label.text}`,
    icon: 'check'
  })

  render () {
    return (
      <div className='menu-select'>
        <Segment>
          <Label
            size='large'
            color='blue'
            ribbon
            className='custom-label'
          >
            <Trans>Choose menu to edit</Trans>
          </Label>
          <div className='flex'>
            <div className='menu-select-select'>
              <Dropdown
                selection
                placeholder='Select menu'
                options={this.props.menus.map((item) => {
                  return {
                    'value': item.term_id,
                    'text': item.name
                  }
                })}
                name='current-menu-select'
                id='current-menu-select'
                onChange={this.selectMenu}
                disabled={this.props.currentMenuDataLoading}
                value={this.props.currentMenuId}
                renderLabel={this.renderLabel}
              />
            </div>
            <span className='span'><Trans>or</Trans></span>
            <Button basic onClick={this.createMenu}><Trans>Create new</Trans></Button>
          </div>
          {this.props.currentMenuName !== 'Main Menu' &&
            <React.Fragment>
              <Divider />
              <div>
                <span className='link danger' onClick={this.deleteMenu}><Trans>Remove Menu</Trans></span>
              </div>
            </React.Fragment>
          }
        </Segment>
      </div>
    )
  }
}
export default MenusSelect

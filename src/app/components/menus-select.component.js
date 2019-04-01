import React from 'react'
import { connect } from 'react-redux'
import { Segment, Divider, Dropdown, Button } from 'semantic-ui-react'
import { selectMenu } from '../$actions/menus.actions'
import { Trans } from 'react-i18next'

@connect((store) => {
  return {
    menus: store.menus.menus,
    currentMenuId: store.menus.currentMenuId,
    currentMenuDataLoading: store.menus.currentMenuDataLoading
  }
})
class MenusSelect extends React.Component {
  selectMenu = (e, data) => {
    const menuId = parseInt(data.value)
    this.props.dispatch(selectMenu(menuId))
  }

  render () {
    return (
      <div className='menu-select'>
        <Segment secondary>
          <h5><Trans>Choose menu to edit</Trans></h5>
          <Divider />
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
              />
            </div>
            <span className='span'><Trans>or</Trans></span>
            <Button basic><Trans>Create new</Trans></Button>
          </div>
        </Segment>
      </div>
    )
  }
}
export default MenusSelect

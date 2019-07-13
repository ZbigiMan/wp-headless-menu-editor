import React from 'react'
import { connect } from 'react-redux'
import ReactJson from 'react-json-view'
import { Segment, Label, Dimmer, Loader, Dropdown } from 'semantic-ui-react'
import { apiGetMenus, apiGetMenuData } from '../_redux-actions/menus-api.actions'
import config from '../config'

@connect((store) => {
  return {
    menusLoading: store.menusApi.menusLoading,
    menus: store.menusApi.menus,
    menuDataLoading: store.menusApi.menuDataLoading,
    currentMenuData: store.menusApi.currentMenuData,
    currentMenuDataLoading: store.menusApi.currentMenuDataLoading,
    currentMenuId: store.menusApi.currentMenuId
  }
})
class MenuApi extends React.Component {
  componentDidMount () {
    this.props.dispatch(apiGetMenus())
  }

  selectMenu = (e, data) => {
    const id = parseInt(data.value)
    this.props.dispatch(apiGetMenuData(id))
  }

  render () {
    return (
      <div className='menu-api'>
        <Segment>
          {!this.props.menusLoading &&
            <React.Fragment>
              <Label
                size='large'
                color='blue'
                ribbon
                className='custom-label'
              >
                <a href={config.restUrl + 'menus/'} target='_blank'>
                  {config.restUrl + 'menus/'}
                </a>
              </Label>
              <ReactJson
                src={this.props.menus}
                theme='ashes'
              />
            </React.Fragment>
          }
          {this.props.menusLoading &&
            <React.Fragment>
              <Dimmer active inverted>
                <Loader inverted />
              </Dimmer>
            </React.Fragment>
          }
        </Segment>
        <Segment>
          {!this.props.menuDataLoading &&
            <React.Fragment>
              <Label
                size='large'
                color='blue'
                ribbon
                className='custom-label'
              >
                <a href={config.restUrl + 'menus/' + this.props.currentMenuId} target='_blank'>
                  {config.restUrl + 'menus/' + this.props.currentMenuId}
                </a>
              </Label>
              <Dropdown
                selection
                placeholder='Select id'
                options={this.props.menus.map((item) => {
                  return {
                    'value': item.term_id,
                    'text': item.term_id
                  }
                })}
                name='current-menu-select'
                id='current-menu-select'
                onChange={this.selectMenu}
                disabled={this.props.currentMenuDataLoading}
                value={this.props.currentMenuId}
                simple
              />
              <ReactJson
                src={this.props.currentMenuData}
                theme='ashes'
              />
            </React.Fragment>
          }
          {this.props.menuDataLoading &&
            <React.Fragment>
              <Dimmer active inverted>
                <Loader inverted />
              </Dimmer>
            </React.Fragment>
          }
        </Segment>
      </div>
    )
  }
}

export default MenuApi

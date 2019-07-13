import React from 'react'
import { connect } from 'react-redux'
import ReactJson from 'react-json-view'
import { Segment, Label, Dimmer, Loader } from 'semantic-ui-react'
import { apiGetMenus } from '../_redux-actions/menus-api.actions'
import config from '../config'

@connect((store) => {
  return {
    menusLoading: store.menusApi.menusLoading,
    menus: store.menusApi.menus,
    menuDataLoading: store.menusApi.menuDataLoading,
    currentMenuData: store.menusApi.currentMenuData,
    currentMenuId: store.menusApi.currentMenuId
  }
})
class MenuApi extends React.Component {
  componentDidMount () {
    this.props.dispatch(apiGetMenus())
  }

  render () {
    return (
      <React.Fragment>
        <Segment>
          {!this.props.menusLoading &&
            <React.Fragment>
              <Label size='large' color='blue' ribbon>{config.restUrl + 'menus/'}</Label>
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
              <Label size='large' color='blue' ribbon>{config.restUrl + 'menus/' + this.props.currentMenuId}</Label>
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
      </React.Fragment>
    )
  }
}

export default MenuApi

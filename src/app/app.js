import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { selectMenu, setMenus } from './_redux-actions/menus.actions'
import { setPostTypes } from './_redux-actions/posts.actions'

import config from './config'

import MenuEditorContainer from './components/menu-editor-container'
import MenuApiContainer from './components/menu-api-container'

import I18n from './i18n'

/* global data */

@connect((store) => {
  return {
    currentpostTypes: store.posts.currentpostTypes
  }
})
class App extends React.Component {
  constructor () {
    super()
    this.state = {
      menus_editor: false,
      menus_api: false
    }
    config.locale = data.locale
    config.wp_ajax_url = data.urls.wpajax
    config.adminUrl = data.urls.admin
    config.restUrl = data.urls.rest

    const i18n = new I18n()
    i18n.init()
  }

  componentDidMount () {
    switch (this.props.location.search) {
      case '?page=menus_editor':
        this.props.dispatch(setMenus(data.menus))
        this.props.dispatch(selectMenu(data.menus[0].term_id))
        this.props.dispatch(setPostTypes(data.posts_types))

        this.setState({
          menus_editor: true
        })
        return (<Redirect to='/admin.php?page=menus_editor' preserveQueryString={false} />)

      case '?page=menus_api':
        this.setState({
          menus_api: true
        })
        return (<Redirect to='/admin.php?page=menus_api' preserveQueryString={false} />)
    }
  }

  render () {
    return (
      <div className='_wp_headless_menu_editor'>
        { this.state.menus_editor &&
          <Route exact path='/admin.php' component={MenuEditorContainer} />
        }
        { this.state.menus_api &&
          <Route exact path='/admin.php' component={MenuApiContainer} />
        }
      </div>
    )
  }
}

export default withRouter(App)

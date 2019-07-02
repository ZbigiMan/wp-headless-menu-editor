import React from 'react'
import { connect } from 'react-redux'

import { selectMenu, setMenus } from './_redux-actions/menus.actions'
import { setPostTypes } from './_redux-actions/posts.actions'

import config from './config'

import MenuEditorContainer from './components/menu-editor-container'

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
    config.locale = data.locale
    config.apiUrl = data.wpajax.url
    config.adminUrl = data.admin.url
    const i18n = new I18n()
    i18n.init()
  }

  componentDidMount () {
    this.props.dispatch(setMenus(data.menus))
    this.props.dispatch(selectMenu(data.menus[0].term_id))
    this.props.dispatch(setPostTypes(data.posts_types))
  }

  render () {
    return (
      <div className='_wp_headless_menu_editor'>
        <MenuEditorContainer />
      </div>
    )
  }
}

export default App

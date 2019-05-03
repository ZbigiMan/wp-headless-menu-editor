import React from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { selectMenu, setMenus } from './actions/menus.actions'
import { setPostsTypes } from './actions/posts.actions'

import config from './config'
import Header from './components/header'
import MenusSelect from './components/menus-select'
import MenuEditor from './components/menu-editor'
import PostsSelect from './components/posts-select'
import PostsList from './components/posts-list'
import ConfirmRemoveMenuItem from './components/modal-confirm-remove-menu-item'
import ModalMenuItemEditor from './components/modal-menu-item-editor'

import I18n from './i18n'

/* global data */

@connect((store) => {
  return {
    currentPostsTypes: store.posts.currentPostsTypes
  }
})
class App extends React.Component {
  constructor () {
    super()
    config.locale = data.locale
    config.apiUrl = data.wpajax.url
    const i18n = new I18n()
    i18n.init()
  }

  componentDidMount () {
    this.props.dispatch(setMenus(data.menus))
    this.props.dispatch(selectMenu(data.menus[0].term_id))
    this.props.dispatch(setPostsTypes(data.posts_types))
  }

  render () {
    return (
      <div className='_headless_dashboard_menu_editor'>
        <ModalMenuItemEditor />
        <ConfirmRemoveMenuItem />
        <Header />
        <Grid>
          <Grid.Column width={6}>
            <PostsSelect />
            <PostsList />
          </Grid.Column>
          <Grid.Column width={10}>
            <MenuEditor />
            <MenusSelect />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default App

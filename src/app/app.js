import React from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { selectMenu, setMenus } from './$actions/menus.actions'
import { setPostsTypes } from './$actions/posts.actions'

import config from './config'
import Header from './components/header.component'
import MenusSelect from './components/menus-select.component'
import MenuEditor from './components/menu-editor.component'
import PostsSelect from './components/posts-select.component'
import PostsList from './components/posts-list.component'

/* global data */

@connect((store) => {
  return {
    currentPostsTypes: store.posts.currentPostsTypes
  }
})
class App extends React.Component {
  constructor () {
    super()
    config.apiUrl = data.wpajax.url
  }

  componentDidMount () {
    this.props.dispatch(setMenus(data.menus))
    this.props.dispatch(selectMenu(data.menus[0].term_id))
    this.props.dispatch(setPostsTypes(data.posts_types))
  }

  render () {
    return (
      <div className='_headless_dashboard_menu_editor'>
        <Header />
        <Grid>
          <Grid.Column width={8}>
            <MenuEditor />
            <MenusSelect />
          </Grid.Column>
          <Grid.Column width={8}>
            <PostsSelect />
            <PostsList />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default App

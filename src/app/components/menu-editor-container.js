import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Header from './header'
import MenusSelect from './menus-select'
import MenuEditor from './menu-editor'
import PostsSelect from './posts-select'
import PostsList from './posts-list'
import ConfirmRemoveMenuItem from './modal-confirm-remove-menu-item'
import ModalMenuItemEditor from './modal-menu-item-editor'

@connect((store) => {
  return {
    postTypes: store.posts.postTypes
  }
})
class MenuEditorContainer extends React.Component {
  render () {
    return (
      <React.Fragment>
        <ModalMenuItemEditor />
        <ConfirmRemoveMenuItem />
        <Header title='pluginTitle' />
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
      </React.Fragment>
    )
  }
}

export default MenuEditorContainer

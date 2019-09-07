import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import MenusSelect from './menus-select'
import MenuEditor from './menu-editor'
import PostsSelect from './posts-select'
import PostsList from './posts-list'
import ConfirmRemoveMenuItem from './modal-confirm-remove-menu-item'
import ModalMenuItemEditor from './modal-menu-item-editor'
import ModalCreateMenu from './modal-create-menu'
import ConfirmRemoveMenu from './modal-confirm-remove-menu'

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
        <ConfirmRemoveMenu />
        <ModalCreateMenu />
        <Grid>
          <Grid.Column width={6} className='main'>
            <PostsSelect />
            <PostsList />
          </Grid.Column>
          <Grid.Column width={10} className='main'>
            <MenuEditor />
            <MenusSelect />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

export default MenuEditorContainer

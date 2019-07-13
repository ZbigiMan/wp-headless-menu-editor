import React from 'react'
import Header from './header'
import MenuApi from './menu_api'

class MenuApiContainer extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Header title='pluginApiTitle' />
        <MenuApi />
      </React.Fragment>
    )
  }
}

export default MenuApiContainer

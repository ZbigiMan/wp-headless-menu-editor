import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

class MenuItemToolBox extends React.Component {
  render () {
    return (
      <div className='menu-item-toolbox'>
        <Button basic icon>
          <Icon name='edit' />
        </Button>
      </div>
    )
  }
}

export default MenuItemToolBox

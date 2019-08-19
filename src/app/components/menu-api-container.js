import React from 'react'
import { Grid } from 'semantic-ui-react'
import MenuApi from './menu_api'

class MenuApiContainer extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={16} className='main'>
            <MenuApi />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

export default MenuApiContainer

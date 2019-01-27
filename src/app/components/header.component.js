import React from 'react'
import { Segment } from 'semantic-ui-react'

class Header extends React.Component {
  render () {
    return (
      <Segment secondary textAlign='center' size='mini'>
        <h3>Site Tree Editor <sup>*based on wp menus API</sup></h3>
      </Segment>
    )
  }
}

export default Header

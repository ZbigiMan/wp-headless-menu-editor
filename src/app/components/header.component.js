import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Trans } from 'react-i18next'

class Header extends React.Component {
  render () {
    return (
      <Segment secondary textAlign='center' size='mini'>
        <h3><Trans>pluginTitle</Trans></h3>
      </Segment>
    )
  }
}

export default Header

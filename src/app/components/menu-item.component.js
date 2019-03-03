import React from 'react'
import { connect } from 'react-redux'
import { Segment, Label } from 'semantic-ui-react'
import MenuItemToolBox from './menu-item-toolbox.component'

@connect((store) => {
  return {
    postTypes: store.posts.postsTypes
  }
})
class MenuItem extends React.Component {
  render () {
    return (
      <Segment
        className='menu-item-segment'
        secondary={this.props.secondary}
        id={'menu-item-segment-' + this.props.prefix + this.props.item.ID}
        key={'menu-item-segment-' + this.props.prefix + this.props.item.ID}
      >
        <div
          className='menu-item-segment-content'
          id={'menu-item-segment-content-' + this.props.prefix + this.props.item.ID}
          key={'menu-item-segment-content-' + this.props.prefix + this.props.item.ID}
        >
          <span
            className='menu-item-bar'
            id={'menu-item-bar-' + this.props.prefix + this.props.item.ID}
          >
            {this.props.item.title}
          </span>
          <Label basic size='tiny'>
            {this.props.postTypes.find(type => {
              return type.value === this.props.item.object
            }).text}
          </Label>
          <MenuItemToolBox
            item={this.props.item}
            key={'MenuItemToolBox-' + this.props.prefix + this.props.item.ID}
          />
        </div>
      </Segment>
    )
  }
}

export default MenuItem

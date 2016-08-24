import isFunction from 'lodash/isFunction'
import React, {Component, PropTypes} from 'react'
import {DragSource} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import classnames from 'classnames'
import {TOPPING_DRAG_SOURCE} from '../constants/topping'

const source = {
  beginDrag (props) {
    const {topping, beginDrag} = props
    const data = topping.toJSON()
    return (isFunction(beginDrag) ? beginDrag(data) : data)
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

class Topping extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    topping: PropTypes.object.isRequired,
    beginDrag: PropTypes.func
  }

  componentDidMount() {
    const {connectDragPreview} = this.props
    connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    })
  }

  onClick (event) {
    event.preventDefault()
  }

  render () {
    const {isDragging, connectDragSource, topping} = this.props
    const name = topping.get('name')
    const style = {
      backgroundColor: `#${topping.get('color')}`
    }
    const className = classnames({
      loading: isDragging,
      topic: true,
      item: true
    })
    return connectDragSource(
      <li className={className} style={style}>
        <a href="" className="anchor" title={name} onClick={this.onClick}>
          {name}
        </a>
      </li>
    )
  }
}

export default DragSource(TOPPING_DRAG_SOURCE, source, collect)(Topping)

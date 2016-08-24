import React, {Component, PropTypes} from 'react'
import {DropTarget} from 'react-dnd'
import classnames from 'classnames'
import Loading from './loading'
import Toppings from './toppings'
import {TOPPING_DRAG_SOURCE} from '../constants/topping'

const target = {
  drop (props, monitor) {
    const {removeTopping} = props
    const item = monitor.getItem()
    const {pizza, topping} = item
    removeTopping(pizza.id, topping.id)
  },

  canDrop (props, monitor) {
    const item = monitor.getItem()
    const {pizza, topping} = item
    return (!!pizza && !!topping)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

class Menu extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    items: PropTypes.object,
    loading: PropTypes.bool,
    removeTopping: PropTypes.func
  }

  renderLoading () {
    return <Loading message="Fetching menu data..." />
  }

  renderToppings () {
    const {items} = this.props
    return <Toppings toppings={items} />
  }

  render () {
    const {canDrop, isOver, connectDropTarget, loading = false} = this.props
    const children = (loading ? this.renderLoading : this.renderToppings)
    const className = classnames({
      navigation: true,
      menu: true,
      loading
    })
    return connectDropTarget(
      <nav className={className}>
        <h2 className="title">Select your toppings</h2>
        {children.call(this)}
      </nav>
    )
  }
}

export default DropTarget([TOPPING_DRAG_SOURCE], target, collect)(Menu)

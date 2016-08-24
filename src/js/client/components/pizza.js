import isEqual from 'lodash/isEqual'
import {Iterable} from 'immutable'
import React, {Component, PropTypes} from 'react'
import {DropTarget} from 'react-dnd'
import classnames from 'classnames'
import Loading from './loading'
import Toppings from './toppings'
import {TOPPING_DRAG_SOURCE} from '../constants/topping'

const target = {
  drop (props, monitor) {
    const {pizza, addTopping} = props
    const topping = monitor.getItem()
    addTopping(pizza.get('id'), topping.id)
  },

  canDrop (props, monitor) {
    const {pizza} = props
    const topping = monitor.getItem()
    return (Iterable.isIterable(pizza) && !!topping.id)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

class Pizza extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    pizza: PropTypes.object.isRequired,
    toppings: PropTypes.object.isRequired,
    addTopping: PropTypes.func
  }

  beginDragTopping (topping) {
    const {pizza} = this.props
    return {
      pizza: pizza.toJSON(),
      topping
    }
  }

  findToppingById (topping) {
    return isEqual(topping.get('id'), this)
  }

  formatTopping (topping) {
    const {toppings} = this.props
    return toppings.find(this.findToppingById.bind(topping))
  }

  getToppings (toppings) {
    return toppings.map(this.formatTopping.bind(this))
  }

  renderLoading () {
    return <Loading message="Drag your favorite toppings" />
  }

  renderToppings () {
    const {pizza} = this.props
    const toppings = this.getToppings(pizza.get('toppings'))
    return <Toppings {...{
      beginDrag: this.beginDragTopping.bind(this),
      toppings
    }} />
  }

  render () {
    const {canDrop, isOver, connectDropTarget, pizza} = this.props
    const toppings = this.getToppings(pizza.get('toppings'))
    const loading = !toppings.count()
    const content = (loading ? this.renderLoading : this.renderToppings)
    const className = classnames({
      definition: true,
      item: true,
      loading
    })
    return connectDropTarget(
      <dl className={className}>
        <dt className="title">{pizza.get('title')}</dt>
        <dd className="description">
          <h5 className="title">Your selected toppings</h5>
          {content.call(this)}
        </dd>
      </dl>
    )
  }
}

export default DropTarget([TOPPING_DRAG_SOURCE], target, collect)(Pizza)

import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import Topping from './topping'

export default class Toppings extends Component {
  static propTypes = {
    toppings: PropTypes.object,
    beginDrag: PropTypes.func
  }

  renderToppings (topping, index) {
    const {toppings, beginDrag} = this.props
    return <Topping {...{
      key: index,
      topping,
      beginDrag
    }} />
  }

  render () {
    const {toppings} = this.props
    const className = classnames({
      [`total-${toppings.count()}`]: true,
      list: true,
      collection: true,
      toppings: true
    })
    return <ul className={className}>
      {toppings.map(this.renderToppings.bind(this))}
    </ul>
  }
}

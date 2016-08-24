import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import Pizza from './pizza'

export default class Pizzas extends Component {
  static propTypes = {
    pizzas: PropTypes.object.isRequired,
    toppings: PropTypes.object.isRequired,
    addTopping: PropTypes.func.isRequired
  }

  renderPizzas (pizza, index) {
    const {toppings, addTopping} = this.props
    return <Pizza {...{
      key: index,
      pizza,
      toppings,
      addTopping
    }} />
  }

  render () {
    const {pizzas} = this.props
    const className = classnames({
      article: true,
      collection: true,
      pizzas: true
    })
    return <article className={className}>
      <h2 className="title">Your pizzas</h2>
      {pizzas.map(this.renderPizzas.bind(this))}
    </article>
  }
}

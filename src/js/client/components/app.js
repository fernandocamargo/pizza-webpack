import toArray from 'lodash/toarray'
import isEqual from 'lodash/isEqual'
import React, {Component, PropTypes} from 'react'
import {default as HTML5Backend} from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'
import Menu from './../components/Menu'
import Pizzas from './../components/pizzas'

class App extends Component {
  static propTypes = {
    toppings: PropTypes.object.isRequired,
    pizzas: PropTypes.object.isRequired,
    addTopping: PropTypes.func.isRequired,
    removeTopping: PropTypes.func.isRequired
  }

  renderMenu () {
    const {toppings, addTopping, removeTopping} = this.props
    return <Menu {...{
      items: toppings.get('items'),
      loading: toppings.get('loading'),
      addTopping,
      removeTopping
    }} />
  }

  renderPizzas () {
    const {toppings, pizzas, addTopping, removeTopping} = this.props
    const hasToppings = !!toppings.get('items').count()
    return (!hasToppings ? false : <Pizzas {...{
      pizzas: pizzas.get('items'),
      toppings: toppings.get('items'),
      addTopping,
      removeTopping
    }} />)
  }

  render () {
    const {toppings} = this.props
    return <div className="wrapper app">
      <h1 className="title">Pizza time!</h1>
      {this.renderMenu.call(this)}
      {this.renderPizzas.call(this)}
    </div>
  }
}

export default DragDropContext(HTML5Backend)(App)

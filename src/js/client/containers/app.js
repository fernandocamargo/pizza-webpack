import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as toppingsActions from './../actions/toppings'
import * as pizzasActions from './../actions/pizzas'
import App from './../components/app'

function mapStateToProps (state) {
  const {toppings, pizzas} = state
  return {
    toppings,
    pizzas
  }
}

class AppContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  componentDidMount () {
    const {dispatch} = this.props
    dispatch(toppingsActions.getToppings)
  }

  addTopping (pizza, id) {
    const {dispatch} = this.props
    dispatch(pizzasActions.addTopping(pizza, id))
  }

  removeTopping (pizza, id) {
    const {dispatch} = this.props
    dispatch(pizzasActions.removeTopping(pizza, id))
  }

  render () {
    const {toppings, pizzas} = this.props
    return <App {...{
      addTopping: this.addTopping.bind(this),
      removeTopping: this.removeTopping.bind(this),
      toppings,
      pizzas
    }} />
  }
}

export default connect(mapStateToProps)(AppContainer)

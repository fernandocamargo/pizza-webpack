import isEqual from 'lodash/isEqual'
import {Map} from 'immutable'
import * as actions from '../constants/pizzas'

export const saveTopping = (pizza, topping) => ({
  type: actions.ADD_TOPPING,
  pizza,
  topping
})

export const shouldAddTopping = (toppings, topping) => {
  return !~toppings.indexOf(topping)
}

export function findPizzaById (pizza) {
  return isEqual(pizza.get('id'), this)
}

export const addTopping = (pizza, topping) => {
  return (dispatch, getState) => {
    const state = getState()
    const pizzas = state.pizzas.get('items')
    const toppings = pizzas.find(findPizzaById.bind(pizza)).get('toppings')
    if (shouldAddTopping(toppings, topping)) {
      dispatch(saveTopping(pizza, topping))
    }
  }
}

export const removeTopping = (pizza, topping) => ({
  type: actions.REMOVE_TOPPING,
  pizza,
  topping
})


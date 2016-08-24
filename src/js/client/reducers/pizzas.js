import isGreaterOrEqual from 'lodash/gte'
import isEqual from 'lodash/isEqual'
import head from 'lodash/head'
import {List, fromJS} from 'immutable'
import * as actions from '../constants/pizzas'

export const initialState = fromJS({
  limits: {
    toppings: 4
  },
  items: [
    {
      id: 1,
      title: 'Pizza #1',
      toppings: [],
      deepest: false
    }
  ]
})

export function findPizzaById (pizza) {
  return isEqual(pizza.get('id'), this)
}

export const not = function (item) {
  return !isEqual(item, this)
}

export function push (context) {
  const {toppings, topping} = context
  return {
    toppings: toppings.concat(topping),
    deepest: (toppings.first() || topping)
  }
}

export function replace (context) {
  const {toppings, topping, deepest, limit} = context
  const index = toppings.indexOf(deepest)
  const before = toppings.slice(0, index).filter(not.bind(deepest))
  const after = toppings.slice(index + 1)
  return {
    toppings: List
      .of(topping)
      .concat(before)
      .concat(after)
      .slice(0, limit),
    deepest: (after.first() || before.last())
  }
}

export const add = function (state, action) {
  const limit = state.getIn(['limits', 'toppings'])
  const pizzas = state.get('items')
  const index = pizzas.findIndex(findPizzaById.bind(action.pizza))
  const pizza = pizzas.get(index)
  const toppings = pizza.get('toppings')
  const deepest = pizza.get('deepest')
  const full = isGreaterOrEqual(toppings.count(), limit)
  const handler = (full ? replace : push)
  const result = handler({topping: action.topping, toppings, deepest, limit})
  return state.mergeIn(['items', index], result)
}

export const remove = function (state, action) {
  const limit = state.getIn(['limits', 'toppings'])
  const pizzas = state.get('items')
  const index = pizzas.findIndex(findPizzaById.bind(action.pizza))
  const pizza = pizzas.get(index)
  const toppings = pizza.get('toppings').filter(not.bind(action.topping))
  const deepest = (toppings.first() || false)
  const result = {toppings, deepest}
  return state.mergeIn(['items', index], result)
}

export default (state = initialState, action) => {
  const context = {state, action}
  switch (action.type) {
    case actions.ADD_TOPPING:
      return add(state, action)
    case actions.REMOVE_TOPPING:
      return remove(state, action)
    default:
      return state
  }
}

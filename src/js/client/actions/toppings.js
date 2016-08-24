import {Map} from 'immutable'
import {colorFromID} from '../utils/colors'
import {toJSON} from '../utils/requests'
import * as actions from '../constants/toppings'
import * as Data from '../../data/toppings'

export const setLoadingStatus = (loading) => ({
  type: actions.SET_TOPPINGS_LOADING_STATUS,
  loading
})

export const receiveToppings = (toppings) => ({
  type: actions.SET_TOPPINGS,
  toppings
})

export const setToppingColor = (topping) => {
  return Map(topping).set('color', colorFromID(topping.id))
}

export const formatToppings = (data) => data.toppings.map(setToppingColor)

export const dispatchFetchResponse = function (toppings) {
  return this(receiveToppings(toppings))
}

export const dispatchLoadingStatus = function () {
  return this(setLoadingStatus(false))
}

export const fetchToppings = (dispatch) => {
  dispatch(setLoadingStatus(true))
  return Data.getToppings()
    .then(toJSON)
    .then(formatToppings)
    .then(dispatchFetchResponse.bind(dispatch))
    .then(dispatchLoadingStatus.bind(dispatch))
}

export const shouldFetchToppings = (state) => {
  const {toppings} = state
  const loading = toppings.get('loading')
  const items = toppings.get('items')
  return (!loading && !items.size)
}

export const getToppings = (dispatch, getState) => {
  if (shouldFetchToppings(getState())) {
    return dispatch(fetchToppings)
  }
}

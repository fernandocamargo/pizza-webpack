import {fromJS, List} from 'immutable'
import * as actions from '../constants/toppings'

const initialState = fromJS({
  items: [],
  loading: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_TOPPINGS:
      return state.set('items', List(action.toppings))
    case actions.SET_TOPPINGS_LOADING_STATUS:
      return state.set('loading', action.loading)
    default:
      return state
  }
}

import {Map, fromJS} from 'immutable'
import isNil from 'lodash/isNil'

const empty = {}

export const toImmutable = function (object, key) {
  return Object.assign(object, {[key]: fromJS(this[key])})
}

export const serialize = function (data) {
  const json = JSON.parse(data)
  return Object.keys(json).reduce(toImmutable.bind(json), {})
}

export const clearLocalStorage = () => {
  try {
    localStorage.clear()
    return empty.state
  } catch (error) {
    return empty.state
  }
}

export const getLocalStorage = () => {
  try {
    const state = localStorage.getItem('state')
    return (isNil(state) ? empty.state : serialize(state))
  } catch (error) {
    return empty.state
  }
}

export const saveLocalStorage = function () {
  try {
    const state = this.getState()
    localStorage.setItem('state', JSON.stringify(state))
    return state
  } catch (error) {
    return empty.state
  }
}

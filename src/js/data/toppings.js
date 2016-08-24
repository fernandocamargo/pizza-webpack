import promise from 'es6-promise'
import fetch from 'isomorphic-fetch'

promise.polyfill()

export function getToppings () {
  return fetch('./assets/json/toppings.json')
}

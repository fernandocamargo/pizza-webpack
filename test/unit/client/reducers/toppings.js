import {expect} from 'chai'
import * as types from '../../../../src/js/client/constants/toppings'
import reducer from '../../../../src/js/client/reducers/toppings'

describe('Toppings reducer', () => {
  it(`Should handle ${types.SET_TOPPINGS}`, () => {
    const initial = []
    const mock = [
      {id: 1, name: 'Cheese'},
      {id: 2, name: 'Bacon'},
      {id: 3, name: 'Spinach'}
    ]
    const reduced = reducer(initial, {type: types.SET_TOPPINGS, items: mock})
    expect(reduced).to.eql(mock)
  })
})

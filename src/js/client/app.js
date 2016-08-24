import React from 'react'
import {render} from 'react-dom'
import Provider from 'react-redux'
import Root from './containers/root'
import configureStore from './store/configure'
import {getLocalStorage, saveLocalStorage} from './utils/local-storage'

const element = document.getElementById('root')
const store = configureStore(getLocalStorage())
store.subscribe(saveLocalStorage.bind(store))

export default render(<Root {...{store}} />, element)

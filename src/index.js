import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import store from './store'
import App from './components'

const unsubscribe = store.subscribe(() => console.log(store.getState()))

render(
  <App store={store} />,
  document.getElementById('root')
)

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components'

const store = createStore(rootReducer)

render(
  <App store={store} />,
  document.getElementById('root')
)

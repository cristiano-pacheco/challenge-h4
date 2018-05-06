import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import './assets/index.css'

import './config'

import App from './components/app'
import configureStore from './redux-flow/configure-store'

const store = configureStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

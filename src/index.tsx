import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { store } from './store'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/index.scss'

import Layout from './components/Layout/Layout'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider {...store}>
    <Layout />
  </Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './root'

// Init Firebase
import { initializeFirebase } from 'authentication/firebaseConfig'
initializeFirebase()
import {logPerformanceMilestone} from './js/dev/performance'

require('./index.css')

const rootNode = document.createElement('div')
document.body.appendChild(rootNode)

const render = (Component) => {
  ReactDOM.render(
    <AppContainer >
      <Component />
    </AppContainer>,
    rootNode
  )
  logPerformanceMilestone('root_render')
}

render(Root)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./root', () => {
    render(root)
  })
}

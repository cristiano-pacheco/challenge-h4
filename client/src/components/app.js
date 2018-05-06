import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import NavBar from './nav-bar'
import AppRoutes from './app-routes'
import ReloadState from './common/reload-state'

class App extends Component {
  render () {
    return (
      <div>
        <NavBar />
        <ReloadState />
        <Container className='container-app'>
          <AppRoutes />
        </Container>
      </div>
    )
  }
}

export default App

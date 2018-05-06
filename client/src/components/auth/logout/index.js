import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from '../../../services/auth'
import { setAuth } from '../../../redux-flow/reducers/auth/action-creators'

class Logout extends PureComponent {
  componentDidMount () {
    logout()
    this.props.setAuth(false)
  }
  render () {
    return <Redirect to='/' />
  }
}

export default connect(null, { setAuth })(Logout)

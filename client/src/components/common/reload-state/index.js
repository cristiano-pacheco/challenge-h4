import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setAuth } from '../../../redux-flow/reducers/auth/action-creators'

class ReloadState extends Component {
  componentDidMount () {
    if (localStorage.getItem('token')) {
      this.props.setAuth(true)
    }
  }
  render () {
    return <span />
  }
}

export default connect(null, { setAuth })(ReloadState)

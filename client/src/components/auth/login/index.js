import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoginForm from './form'
import ValidateForm from './validator'
import * as AuthAPI from '../../../api/auth'
import { setAuth } from '../../../redux-flow/reducers/auth/action-creators'
import { setToken } from '../../../services/auth/index'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      errors: []
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    if (this.formIsInValid()) return

    this.setState({ isLoading: true })

    const payload = {
      email: this.state.email,
      password: this.state.password
    }

    AuthAPI.login(payload)
      .then(response => {
        this.setState({ isLoading: false })

        setToken(response.data.token)

        this.props.setAuth(true)

        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ isLoading: false })

        if (error.status === 401) {
          this.setState({ errors: ['Invalid credentials'] })
        }

        if (error.status === 404) {
          this.setState({ errors: ['Could not connect to server'] })
        }
      })
  }

  formIsInValid = () => {
    this.setState({ errors: [] })

    const errors = ValidateForm(this.state)

    if (errors.length) {
      this.setState({ errors })
    }

    return !!errors.length
  }

  render () {
    return (
      <LoginForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(null, { setAuth })(Login)

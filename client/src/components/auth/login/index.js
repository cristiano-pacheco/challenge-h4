import React, { Component } from 'react'

import LoginForm from './form'
import ValidateForm from './validator'
import * as AuthAPI from '../../../api/auth'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      errors: [],
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    if (this.formIsInValid()) return;

    this.setState({ isLoading: true })

    AuthAPI.login(this.state)
      .then(response => {
        this.setState({ isLoading: false })
        console.log(response)
      })
      .catch(error => {
        this.setState({ isLoading: false })
        console.log(error.response)
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

export default Login

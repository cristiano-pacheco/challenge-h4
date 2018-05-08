import React, { PureComponent, Fragment } from 'react'

import UserForm from './form'
import * as UserAPI from '../../../api/user'
import ValidateForm from '../../auth/login/validator'
import Breadcrumb from '../../common/breadcrumb'

const initialState = {
  id: null,
  isLoading: false,
  email: '',
  password: '',
  successMessage: '',
  errors: []
}

function getPayload (data) {
  return {
    email: data.email,
    password: data.password
  }
}

function getBreadcrumbData (id) {
  const nameLink = id ? 'Update' : 'Create'
  return [
    { name: 'Users', active: false, link: '/users' },
    { name: nameLink, active: true, link: '' }
  ]
}

class UserFormContainer extends PureComponent {
  constructor () {
    super()
    this.state = initialState
  }

  componentDidMount () {
    const { id } = this.props.match.params
    if (id) {
      this.setState({ isLoading: true, id })
      UserAPI.get(id)
        .then(response => {
          const { data } = response.data
          this.setState({
            email: data.email,
            isLoading: false
          })
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.setState({
              errorMessages: ['User not found.'],
              isLoading: false
            })
            return
          }
          this.setState({
            isLoading: false
          })
        })
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    this.setState({
      isLoading: true,
      errorMessages: [],
      successMessage: ''
    })

    if (this.formIsInValid()) return

    if (this.state.id) {
      this.update()
      return
    }
    this.create()
  }

  create = () => {
    UserAPI.create(getPayload(this.state))
      .then(response => {
        this.setState({
          ...initialState,
          successMessage: 'User successfully registered'
        })
      })
      .catch(error => {
        if (error.status === 422) {
          return this.setState({
            errors: [error.data.message],
            isLoading: false
          })
        }
        this.setState({ isLoading: false })
      })
  }

  update = () => {
    UserAPI.update(this.state.id, getPayload(this.state))
      .then(response => {
        this.setState({
          isLoading: false,
          successMessage: 'User successfully updated.'
        })
      })
      .catch(error => {
        if (error.status === 422) {
          return this.setState({
            errors: [error.data.message],
            isLoading: false
          })
        }
        this.setState({ isLoading: false })
      })
  }

  formIsInValid = () => {
    this.setState({ errors: [] })

    const errors = ValidateForm(this.state)

    if (errors.length) {
      this.setState({ errors, isLoading: false })
    }

    return !!errors.length
  }

  render () {
    return (
      <Fragment>
        <Breadcrumb links={getBreadcrumbData(this.state.id)} />
        <UserForm
          {...this.state}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}

export default UserFormContainer

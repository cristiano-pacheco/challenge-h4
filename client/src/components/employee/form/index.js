import React, { PureComponent } from 'react'

import EmployeeForm from './form'
import * as EmployeeAPI from '../../../api/employee'
import * as UserAPI from '../../../api/user'
import ValidateForm from './validator'
import { getAgeFromDate, getDate } from '../../../utils/helpers'

const initialState = {
  employeeId: null,
  isLoading: false,
  users: [],
  userId: '',
  user: '',
  name: '',
  position: '',
  age: '',
  birthDate: '',
  successMessage: '',
  errors: []
}

function getPayload (data) {
  return {
    user: data.user,
    name: data.name,
    position: data.position,
    birthDate: data.birthDate,
    age: getAgeFromDate(data.birthDate)
  }
}

class EmployeeFormContainer extends PureComponent {
  constructor () {
    super()
    this.state = initialState
  }

  componentDidMount () {
    this.fetchUsers()

    const { companyId, employeeId } = this.props.match.params

    this.setState({ companyId })

    if (employeeId) {
      this.setState({ isLoading: true, employeeId })

      EmployeeAPI.get(companyId, employeeId)
        .then(response => {
          const { data } = response.data
          this.setState({
            name: data.name,
            user: data.user._id,
            userId: data.user._id,
            position: data.position,
            age: data.age,
            birthDate: getDate(data.birthDate),
            isLoading: false
          })
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.setState({
              errorMessages: ['Company not found.'],
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

  fetchUsers = () => {
    UserAPI.getAll()
      .then(response => {
        const { data } = response.data
        const users = data.map(item => ({
          value: item._id,
          text: item.email
        }))
        this.setState({ users })
      })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelectChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    this.setState({
      isLoading: true,
      errorMessages: [],
      successMessage: ''
    })

    if (this.formIsInValid()) return

    if (this.state.employeeId) {
      return this.update()
    }
    this.create()
  }

  create = () => {
    EmployeeAPI.create(this.state.companyId, getPayload(this.state))
      .then(response => {
        this.setState({
          ...initialState,
          successMessage: 'Employee successfully registered',
          users: this.state.users
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
    EmployeeAPI.update(
      this.state.companyId,
      this.state.employeeId,
      getPayload(this.state)
    )
      .then(response => {
        this.setState({
          isLoading: false,
          successMessage: 'Employee successfully updated.'
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
      <EmployeeForm
        {...this.state}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        handleSelectChange={this.handleSelectChange}
      />
    )
  }
}

export default EmployeeFormContainer

import React, { PureComponent } from 'react'

import CompanyForm from './form'
import * as CompanyAPI from '../../../api/company'
import ValidateForm from './validator'

const initialState = {
  id: null,
  isLoading: false,
  name: '',
  cnpj: '',
  successMessage: '',
  errors: []
}

function getPayload (data) {
  return {
    name: data.name,
    cnpj: data.cnpj
  }
}

class CompanyFormContainer extends PureComponent {
  constructor () {
    super()
    this.state = initialState
  }

  componentDidMount () {
    const { id } = this.props.match.params
    if (id) {
      this.setState({ isLoading: true, id })
      CompanyAPI.get(id)
        .then(response => {
          const { data } = response.data
          this.setState({
            name: data.name,
            cnpj: data.cnpj,
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
    CompanyAPI.create(getPayload(this.state))
      .then(response => {
        this.setState({
          ...initialState,
          successMessage: 'Company successfully registered'
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
    CompanyAPI.update(this.state.id, getPayload(this.state))
      .then(response => {
        this.setState({
          isLoading: false,
          successMessage: 'Company successfully updated.'
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
      <CompanyForm
        {...this.state}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default CompanyFormContainer

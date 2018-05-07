import React, { Component } from 'react'

import * as EmployeeAPI from '../../../api/employee'
import EmployeeGrid from './grid'

class EmployeeList extends Component {
  constructor () {
    super()
    this.state = {
      companyId: '',
      employees: [],
      isLoading: false
    }
  }

  componentDidMount () {
    this.fetchEmployees()
  }

  fetchEmployees = () => {
    const { companyId } = this.props.match.params

    this.setState({ isLoading: true, companyId })

    EmployeeAPI.getAll(companyId)
      .then(response => {
        this.setState({ employees: response.data.data, isLoading: false })
      })
      .catch(error => {
        this.setState({ isLoading: false })
        console.log(error)
      })
  }

  handleRemove = employeeId => {
    this.setState({ isLoading: true })
    EmployeeAPI.remove(this.state.companyId, employeeId)
      .then(response => this.fetchEmployees())
      .catch(error => {
        console.log(error)
        this.setState({ isLoading: false })
      })
  }

  render () {
    return (
      <EmployeeGrid
        {...this.state}
        handleRemove={this.handleRemove}
      />
    )
  }
}

export default EmployeeList

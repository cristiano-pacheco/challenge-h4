import React, { PureComponent, Fragment } from 'react'

import EmployeeGrid from './grid'
import * as EmployeeAPI from '../../../api/employee'
import Breadcrumb from '../../common/breadcrumb'

function getBreadcrumbData () {
  return [
    { name: 'Companies', active: false, link: '/companies' },
    { name: 'Employees', active: true, link: '' }
  ]
}

class EmployeeList extends PureComponent {
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
      <Fragment>
        <Breadcrumb links={getBreadcrumbData(this.state.id)} />
        <EmployeeGrid
          {...this.state}
          handleRemove={this.handleRemove}
        />
      </Fragment>
    )
  }
}

export default EmployeeList

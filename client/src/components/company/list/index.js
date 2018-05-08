import React, { PureComponent, Fragment } from 'react'

import CompanyGrid from './grid'
import * as CompanyAPI from '../../../api/company'
import Breadcrumb from '../../common/breadcrumb'

const getBreadcrumbData = () => [
  { name: 'Companies', active: true, link: '' }
]

class CompanyList extends PureComponent {
  constructor () {
    super()
    this.state = {
      companies: [],
      isLoading: false
    }
  }

  componentDidMount () {
    this.fetchCompanies()
  }

  fetchCompanies = () => {
    this.setState({ isLoading: true })
    CompanyAPI.getAll()
      .then(response => {
        this.setState({ companies: response.data.data, isLoading: false })
      })
      .catch(error => {
        this.setState({ isLoading: false })
        console.log(error)
      })
  }

  handleRemove = id => {
    this.setState({ isLoading: true })
    CompanyAPI.remove(id)
      .then(response => this.fetchCompanies())
      .catch(error => {
        console.log(error)
        this.setState({ isLoading: false })
      })
  }

  render () {
    return (
      <Fragment>
        <Breadcrumb links={getBreadcrumbData()} />
        <CompanyGrid
          isLoading={this.state.isLoading}
          companies={this.state.companies}
          handleRemove={this.handleRemove}
        />
      </Fragment>
    )
  }
}

export default CompanyList

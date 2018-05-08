import React, { Component } from 'react'

import * as UserAPI from '../../../api/user'
import UserGrid from './grid'
import Breadcrumb from '../../common/breadcrumb'

const getBreadcrumbData = () => [
  { name: 'Users', active: true, link: '' }
]

class UserList extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      isLoading: false
    }
  }

  componentDidMount () {
    this.fetchUsers()
  }

  fetchUsers = () => {
    this.setState({ isLoading: true })
    UserAPI.getAll()
      .then(response => {
        this.setState({ users: response.data.data, isLoading: false })
      })
      .catch(error => {
        this.setState({ isLoading: false })
        console.log(error)
      })
  }

  handleRemove = id => {
    this.setState({ isLoading: true })
    UserAPI.remove(id)
      .then(response => this.fetchUsers())
      .catch(error => {
        console.log(error)
        this.setState({ isLoading: false })
      })
  }

  render () {
    return (
      <div>
        <Breadcrumb links={getBreadcrumbData()} />
        <UserGrid
          isLoading={this.state.isLoading}
          users={this.state.users}
          handleRemove={this.handleRemove}
        />
      </div>

    )
  }
}

export default UserList

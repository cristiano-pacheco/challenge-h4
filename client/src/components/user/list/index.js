import React, { Component } from 'react'

import * as UserAPI from '../../../api/user'
import UserGrid from './grid'

class UserList extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      isLoading: false
    }
  }

  componentDidMount () {
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

  handleRemove = () => {

  }

  render () {
    return (
      <UserGrid
        isLoading={this.state.isLoading}
        users={this.state.users}
        handleRemove={this.handleRemove}
      />
    )
  }
}

export default UserList

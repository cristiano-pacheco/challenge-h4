import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../../../services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to={`/auth/login`} />
  )} />
)

export default PrivateRoute

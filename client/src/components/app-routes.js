import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './home'
import Login from './auth/login'
import Logout from './auth/logout'
import NotFound from './not-found'
import PrivateRoute from './common/private-route'
import UserList from './user/list'

const AppRoutes = () => (
  <Switch>
    <PrivateRoute exact path='/' component={Home} />
    <Route path='/auth/login' component={Login} />
    <Route path='/auth/logout' component={Logout} />
    <PrivateRoute path='/users' component={UserList} />
    <PrivateRoute component={NotFound} />
  </Switch>
)

export default AppRoutes

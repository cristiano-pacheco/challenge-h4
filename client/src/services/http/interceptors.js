import { logout } from '../auth'

export default http => {
  http.interceptors.response.use(response => {
    return response
  }, function (error) {
    if (!error.response) {
      /* eslint-disable */
      if (window.location.pathname === '/auth/login') {
        return Promise.reject({
          status: 404,
          message: 'Could not connect to server.'
        })
      }
      // return swal('Atenção', 'Could not connect to server.', 'error')
      //   .then(() => {
      //     logout()
      //     return window.location = '/auth/login'
      //   })
      logout()
      return window.location = '/auth/login'
    }

    if (error.response.status === 401 && window.location.pathname !== '/auth/login') {
      // return swal('Atenção', 'The user session has expired, please log in again.', 'error')
      //   .then(() => {
      //     logout()
      //     return window.location = '/auth/login'
      //   })
      logout()
      window.location = '/auth/login'
    }

    return Promise.reject(error.response)
    /* eslint-enable */
  })
}

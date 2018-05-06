import { setTokenHeader, unsetTokenHeader } from '../http'

export const isAuthenticated = () => !!localStorage.getItem('token')

export const setToken = token => {
  localStorage.setItem('token', token)
  setTokenHeader(token)
}

export const logout = () => {
  localStorage.removeItem('token')
  unsetTokenHeader()
}

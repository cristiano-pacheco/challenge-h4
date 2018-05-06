import http, { setTokenHeader } from '../services/http'

setTokenHeader(localStorage.getItem('token'))

export const getAll = () => http.get('/users')

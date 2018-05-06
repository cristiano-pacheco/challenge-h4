import http, { setTokenHeader } from '../services/http'

setTokenHeader(localStorage.getItem('token'))

export const getAll = () => http.get('/users')
export const get = id => http.get(`/users/${id}`)
export const create = data => http.post('/users', data)
export const update = (id, data) => http.put(`/users/${id}`, data)
export const remove = id => http.delete(`/users/${id}`)

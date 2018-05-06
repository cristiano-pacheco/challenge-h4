import http, { setTokenHeader } from '../services/http'

setTokenHeader(localStorage.getItem('token'))

export const getAll = () => http.get('/companies')
export const get = id => http.get(`/companies/${id}`)
export const create = data => http.post('/companies', data)
export const update = (id, data) => http.put(`/companies/${id}`, data)
export const remove = id => http.delete(`/companies/${id}`)

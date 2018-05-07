import http, { setTokenHeader } from '../services/http'

setTokenHeader(localStorage.getItem('token'))

export const getAll = companyId => http.get(`/companies/${companyId}/employees`)

export const get = (companyId, employeeId) =>
  http.get(`/companies/${companyId}/employees/${employeeId}`)

export const create = (companyId, data) =>
  http.post(`/companies/${companyId}/employees`, data)

export const update = (companyId, employeeId, data) =>
  http.put(`/companies/${companyId}/employees/${employeeId}`, data)

export const remove = (companyId, employeeId) =>
  http.delete(`/companies/${companyId}/employees/${employeeId}`)

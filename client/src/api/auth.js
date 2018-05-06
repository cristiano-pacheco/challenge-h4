import http from '../services/http'

export const login = data => http.post('/login', data)

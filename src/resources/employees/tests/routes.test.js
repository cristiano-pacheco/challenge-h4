'use strict'

const mongoose = require('mongoose')

const { server } = require('../../../server')
const User = require('../../users/schema')
const Company = require('../../companies/schema')
const { getDate } = require('../../../utils/helpers')

describe('/companies', () => {
  afterAll(() => mongoose.disconnect())

  const defaultId = '5ad93a00404dbaa84bc41a73'
  const userId = '5ae7099c8f3d79034a709c0c'
  const employeeId = '5aec55df053ecd4401eec4b8'

  const defaultUser = {
    _id: userId,
    email: 'default@email.com',
    password: '123456'
  }

  const defaultCompany = {
    id: defaultId,
    name: 'company name',
    cnpj: '16.709.280/0001-41',
    employees: [
      {
        _id: '5aec55df053ecd4401eec4b8',
        name: 'Chris',
        age: '31',
        birthDate: '1986-05-29',
        position: 'DEVELOPER',
        user: '5ae7099c8f3d79034a709c0c'
      }
    ]
  }

  beforeEach(async done => {
    const user = new User(defaultUser)
    user._id = userId
    await User.remove({})
    await user.save()

    const company = new Company(defaultCompany)
    company._id = defaultId
    await Company.remove({})
    await company.save()
    done()
  })

  it('GET /companies/{id}/employees - Get all employees', async done => {
    const res = await server.inject({
      method: 'GET',
      url: `/companies/${defaultId}/employees`,
      headers: {
        Authorization: token
      }
    })

    const response = JSON.parse(res.payload).data[0]

    expect(res.statusCode).toEqual(200)
    expect(response.name).toEqual(defaultCompany.employees[0].name)
    expect(response.age).toEqual(Number(defaultCompany.employees[0].age))
    expect(getDate(response.birthDate)).toEqual(defaultCompany.employees[0].birthDate)
    expect(response.user._id).toEqual(defaultCompany.employees[0].user)
    done()
  })

  describe('GET /compaines/:id/employees/:employeeId', () => {
    it('should get an employee', async done => {
      const res = await server.inject({
        method: 'GET',
        url: `/companies/${defaultId}/employees/${employeeId}`,
        headers: {
          Authorization: token
        }
      })

      const response = JSON.parse(res.payload).data

      expect(res.statusCode).toEqual(200)
      expect(response.name).toEqual(defaultCompany.employees[0].name)
      expect(response.age).toEqual(Number(defaultCompany.employees[0].age))
      expect(getDate(response.birthDate)).toEqual(defaultCompany.employees[0].birthDate)
      expect(response.user._id).toEqual(defaultCompany.employees[0].user)
      done()
    })

    it('should receive the 404 http status code when a company is not found', async done => {
      const res = await server.inject({
        method: 'GET',
        url: `/companies/5ae7099c8f3d79034a709c0c/employees/5ae7099c8f3d79034a709c0c`,
        headers: {
          Authorization: token
        }
      })

      expect(res.statusCode).toEqual(404)
      done()
    })
  })

  describe('POST /companies/:id/employees', () => {
    it('Add an employee', async done => {
      const user = {
        _id: '5aeaf35e5fb046391659c015',
        email: 'icarus@email.com',
        password: 'secret'
      }
      await User.create(user)

      const payload = {
        name: 'Icarus',
        age: '5',
        birthDate: '2013-02-11',
        position: 'DIRECTOR',
        user: '5aeaf35e5fb046391659c015'
      }

      const res = await server.inject({
        method: 'POST',
        url: `/companies/${defaultId}/employees`,
        payload,
        headers: {
          Authorization: token
        }
      })

      const response = JSON.parse(res.payload).data

      expect(res.statusCode).toBe(201)

      expect(response.name).toEqual(payload.name)
      expect(response.age).toEqual(Number(payload.age))
      expect(getDate(response.birthDate)).toEqual(payload.birthDate)
      expect(response.position).toEqual(payload.position)
      expect(response.user).toEqual(payload.user)

      done()
    })

    it('Should returns 422 status code when the user informed is already an employee of the company', async done => {
      const payload = {
        name: 'Icarus',
        age: '5',
        birthDate: '2013-02-11',
        position: 'DIRECTOR',
        user: userId
      }

      const res = await server.inject({
        method: 'POST',
        url: `/companies/${defaultId}/employees`,
        payload,
        headers: {
          Authorization: token
        }
      })

      const response = JSON.parse(res.payload)

      expect(res.statusCode).toBe(422)
      expect(response.message).toBe('The informed user is already an employee of the company.')
      done()
    })

    it('Should returns 404 status code when the company is not found', async done => {
      const payload = {
        name: 'Icarus',
        age: '5',
        birthDate: '2013-02-11',
        position: 'DIRECTOR',
        user: userId
      }
      const res = await server.inject({
        method: 'POST',
        url: `/companies/${userId}/employees`,
        payload,
        headers: {
          Authorization: token
        }
      })

      const response = JSON.parse(res.payload)

      expect(response.statusCode).toBe(404)
      expect(response.message).toBe('Company is not found')
      done()
    })
  })

  describe('PUT /companies/:id/employees/:employeeId', () => {
    it('Update an employee', async done => {
      const employeeId = (await Company.findById(defaultId)).employees[0]._id

      const payload = {
        name: 'Icarus',
        age: '5',
        birthDate: '2013-02-11',
        position: 'DIRECTOR',
        user: '5ae7099c8f3d79034a709c0c'
      }

      const res = await server.inject({
        method: 'PUT',
        url: `/companies/${defaultId}/employees/${employeeId}`,
        payload: payload,
        headers: {
          Authorization: token
        }
      })

      expect(res.statusCode).toBe(200)

      const employee = (await Company.findById(defaultId)).employees[0]

      expect(employee.name).toEqual(payload.name)
      expect(employee.age).toEqual(Number(payload.age))
      expect(employee.birthDate).toEqual(new Date(payload.birthDate))
      expect(employee.position).toEqual(payload.position)
      expect(JSON.stringify(employee.user._id)).toEqual(JSON.stringify(payload.user))

      done()
    })

    it('Should returns 404 status code when the company is not found', async done => {
      const payload = {
        name: 'Icarus',
        age: '5',
        birthDate: '2013-02-11',
        position: 'DIRECTOR',
        user: userId
      }
      const res = await server.inject({
        method: 'PUT',
        url: `/companies/${userId}/employees/${userId}`,
        payload,
        headers: {
          Authorization: token
        }
      })

      const response = JSON.parse(res.payload)

      expect(response.statusCode).toBe(404)
      expect(response.message).toBe('Company is not found')
      done()
    })
  })

  describe('DELETE /companies/:id/employees/:employeeId', () => {
    it('Should delete an employee', async done => {
      const employeeId = (await Company.findById(defaultId)).employees[0]._id
      const res = await server.inject({
        method: 'DELETE',
        url: `/companies/${defaultId}/employees/${employeeId}`,
        headers: {
          Authorization: token
        }
      })
      expect(res.statusCode).toBe(204)
      done()
    })

    it('should receive the 404 http status code when a company is not found', async done => {
      const res = await server.inject({
        method: 'DELETE',
        url: `/companies/${userId}/employees/${userId}`,
        headers: {
          Authorization: token
        }
      })

      expect(res.statusCode).toEqual(404)
      done()
    })
  })
})

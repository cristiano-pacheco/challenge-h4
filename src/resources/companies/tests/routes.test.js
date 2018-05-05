'use strict'

const mongoose = require('mongoose')

const { server } = require('../../../server')
const User = require('../../users/schema')
const Company = require('../schema')
const { getDate } = require('../../../utils/helpers')

describe('/companies', () => {
  afterAll(() => mongoose.disconnect())

  const defaultId = '5ad93a00404dbaa84bc41a73'
  const userId = '5ae7099c8f3d79034a709c0c'

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
        name: 'Chris',
        age: 31,
        birthDate: '1986-05-29',
        position: 'DEVELOPER',
        user: userId
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

  it('GET /companies - Get all companies', async done => {
    const res = await server.inject({
      method: 'GET',
      url: '/companies',
      headers: {
        Authorization: token
      }
    })

    const payload = JSON.parse(res.payload).data[0]

    expect(res.statusCode).toEqual(200)
    expect(payload.name).toEqual(defaultCompany.name)
    expect(payload.cnpj).toEqual(defaultCompany.cnpj)

    expect(payload.employees[0].name).toEqual(defaultCompany.employees[0].name)
    expect(payload.employees[0].age).toEqual(defaultCompany.employees[0].age)
    expect(getDate(payload.employees[0].birthDate)).toEqual(defaultCompany.employees[0].birthDate)
    expect(payload.employees[0].position).toEqual(defaultCompany.employees[0].position)

    expect(payload.employees[0].user._id).toEqual(userId)
    expect(payload.employees[0].user.email).toEqual(defaultUser.email)
    done()
  })

  describe('GET /compaines/:id', () => {
    it('should get a company', async done => {
      const res = await server.inject({
        method: 'GET',
        url: `/companies/${defaultId}`,
        headers: {
          Authorization: token
        }
      })

      const payload = JSON.parse(res.payload).data

      expect(res.statusCode).toEqual(200)

      expect(payload.name).toEqual(defaultCompany.name)
      expect(payload.cnpj).toEqual(defaultCompany.cnpj)

      expect(payload.employees[0].name).toEqual(defaultCompany.employees[0].name)
      expect(payload.employees[0].age).toEqual(defaultCompany.employees[0].age)
      expect(getDate(payload.employees[0].birthDate)).toEqual(defaultCompany.employees[0].birthDate)
      expect(payload.employees[0].position).toEqual(defaultCompany.employees[0].position)

      expect(payload.employees[0].user._id).toEqual(userId)
      expect(payload.employees[0].user.email).toEqual(defaultUser.email)
      done()
    })

    it('should receive the 404 http status code when a company is not found', async done => {
      const res = await server.inject({
        method: 'GET',
        url: `/companies/5ae7099c8f3d79034a709c0c`,
        headers: {
          Authorization: token
        }
      })

      expect(res.statusCode).toEqual(404)
      done()
    })
  })

  describe('POST /companies', () => {
    it('Create a company', async done => {
      const payload = {
        name: 'new company',
        cnpj: '11.285.143/0001-03',
        employees: [
          {
            name: 'Icarus',
            age: '5',
            birthDate: '2013-02-11',
            position: 'DIRECTOR',
            user: userId
          }
        ]
      }
      const res = await server.inject({
        method: 'POST',
        url: '/companies',
        payload,
        headers: {
          Authorization: token
        }
      })

      expect(res.statusCode).toBe(201)

      const result = JSON.parse(res.payload).data

      expect(result.name).toEqual(payload.name)
      expect(result.cnpj).toEqual(payload.cnpj)

      expect(result.employees[0].name).toEqual(payload.employees[0].name)
      expect(result.employees[0].age).toEqual(5)
      expect(getDate(result.employees[0].birthDate)).toEqual(payload.employees[0].birthDate)
      expect(result.employees[0].position).toEqual(payload.employees[0].position)
      expect(result.employees[0].user).toEqual(userId)

      done()
    })

    it('Should returns 422 status code when the cnpj informed is already in use', async done => {
      const payload = {
        name: 'new company',
        cnpj: '16.709.280/0001-41',
        employees: [
          {
            name: 'Icarus',
            age: '5',
            birthDate: '2013-02-11',
            position: 'DIRECTOR',
            user: userId
          }
        ]
      }
      const res = await server.inject({
        method: 'POST',
        url: '/companies',
        payload,
        headers: {
          Authorization: token
        }
      })

      const result = JSON.parse(res.payload)

      expect(result.statusCode).toBe(422)
      expect(result.message).toBe('Cnpj is already in use')
      done()
    })

    it('Should returns 422 status code when the cnpj informed is invalid', async done => {
      const payload = {
        name: 'new company',
        cnpj: 'abcd',
        employees: [
          {
            name: 'Icarus',
            age: '5',
            birthDate: '2013-02-11',
            position: 'DIRECTOR',
            user: userId
          }
        ]
      }
      const res = await server.inject({
        method: 'POST',
        url: '/companies',
        payload,
        headers: {
          Authorization: token
        }
      })

      const result = JSON.parse(res.payload)

      expect(result.statusCode).toBe(422)
      expect(result.message).toBe('Cnpj is invalid')
      done()
    })
  })

  describe('PUT /companies/:id', () => {
    it('Update a company', async done => {
      const newUserId = '5aeaf35e5fb046391659c015'
      const newUserData = {
        email: 'newuser@email.com',
        password: '123456'
      }
      const newUser = new User(newUserData)
      newUser._id = newUserId
      await newUser.save()

      const payload = {
        name: 'new company',
        cnpj: '78.023.114/0001-44',
        employees: [
          {
            name: 'Icarus',
            age: '5',
            birthDate: '2013-02-11',
            position: 'DIRECTOR',
            user: newUserId
          }
        ]
      }

      const res = await server.inject({
        method: 'PUT',
        url: `/companies/${defaultId}`,
        payload: payload,
        headers: {
          Authorization: token
        }
      })

      expect(res.statusCode).toBe(200)

      const company = await Company.findById(defaultId)

      expect(company.name).toEqual(payload.name)
      expect(company.cnpj).toEqual(payload.cnpj)

      expect(company.employees[0].name).toEqual(payload.employees[0].name)
      expect(company.employees[0].age).toEqual(Number(payload.employees[0].age))
      expect(company.employees[0].birthDate).toEqual(new Date(payload.employees[0].birthDate))
      expect(company.employees[0].position).toEqual(payload.employees[0].position)

      expect(JSON.stringify(company.employees[0].user._id)).toEqual(JSON.stringify(newUserId))
      expect(company.employees[0].user.email).toEqual(newUserData.email)
      done()
    })

    it('Should returns 422 status code when the cnpj informed is already in use', async done => {
      const newCompany = {
        name: 'new company',
        cnpj: '73.264.224/0001-84',
        employees: [
          {
            name: 'Icarus',
            age: '5',
            birthDate: '2013-02-11',
            position: 'DIRECTOR',
            user: userId
          }
        ]
      }

      const company = new Company(newCompany)
      await company.save()

      const res = await server.inject({
        method: 'PUT',
        url: `/companies/${defaultId}`,
        payload: newCompany,
        headers: {
          Authorization: token
        }
      })

      const result = JSON.parse(res.payload)

      expect(res.statusCode).toBe(422)
      expect(result.message).toBe('Cnpj is already in use')
      done()
    })

    it('Should returns 422 status code when the cnpj informed is invalid', async done => {
      const newCompany = {
        name: 'new company',
        cnpj: 'invalid_cnpj',
        employees: [
          {
            name: 'Icarus',
            age: '5',
            birthDate: '2013-02-11',
            position: 'DIRECTOR',
            user: userId
          }
        ]
      }

      const company = new Company(newCompany)
      await company.save()

      const res = await server.inject({
        method: 'PUT',
        url: `/companies/${defaultId}`,
        payload: newCompany,
        headers: {
          Authorization: token
        }
      })

      const result = JSON.parse(res.payload)

      expect(res.statusCode).toBe(422)
      expect(result.message).toBe('Cnpj is invalid')
      done()
    })

    it('should receive the 404 http status code when a company is not found', async done => {
      const newCompany = {
        name: 'new company',
        cnpj: '73.264.224/0001-84'
      }

      const res = await server.inject({
        method: 'PUT',
        url: `/companies/5ae7099c8f3d79034a709c0c`,
        payload: newCompany,
        headers: {
          Authorization: token
        }
      })

      expect(res.statusCode).toEqual(404)
      done()
    })
  })

  describe('DELETE /companies/:id', () => {
    it('Should delete a company', async done => {
      const res = await server.inject({
        method: 'DELETE',
        url: `/companies/${defaultId}`,
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
        url: `/companies/5ae7099c8f3d79034a709c0c`,
        headers: {
          Authorization: token
        }
      })

      expect(res.statusCode).toEqual(404)
      done()
    })
  })
})

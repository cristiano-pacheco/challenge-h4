'use strict'

const mongoose = require('mongoose')

const { server } = require('../../../server')
const User = require('../schema')

describe('/users', () => {
  afterAll(() => mongoose.disconnect())

  const defaultId = '5ad93a00404dbaa84bc41a73'

  const defaultUser = {
    id: defaultId,
    name: 'default_user',
    email: 'default@email.com',
    password: '123456'
  }

  const expectedUser = {
    __v: 0,
    _id: defaultId,
    name: 'default_user',
    email: 'default@email.com'
  }

  beforeEach(async done => {
    const user = new User(defaultUser)
    user._id = defaultId
    await User.remove({})
    await user.save()
    done()
  })

  it('GET /users - Get all users', async done => {
    const res = await server.inject({
      method: 'GET',
      url: '/users',
      headers: {
        Authorization: token
      }
    })

    const payload = JSON.parse(res.payload).data[0]

    expect(res.statusCode).toEqual(200)
    expect(payload.name).toEqual(expectedUser.name)
    expect(payload.email).toEqual(expectedUser.email)
    done()
  })

  it('GET /users/:id - Get a user', async done => {
    const res = await server.inject({
      method: 'GET',
      url: `/users/${defaultId}`,
      headers: {
        Authorization: token
      }
    })

    const payload = JSON.parse(res.payload).data

    expect(res.statusCode).toEqual(200)
    expect(payload.name).toEqual(expectedUser.name)
    expect(payload.email).toEqual(expectedUser.email)
    done()
  })

  describe('POST /users', () => {
    it('Create a user', async done => {
      const res = await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          name: 'new_user',
          email: 'newuser@gmail.com',
          password: '3334455'
        },
        headers: {
          Authorization: token
        }
      })

      expect(res.statusCode).toBe(201)

      const result = JSON.parse(res.payload)

      expect(result.data.name).toEqual('new_user')
      expect(result.data.email).toEqual('newuser@gmail.com')

      done()
    })

    it('Should returns 422 status code when the email informed is already in use', async done => {
      const res = await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          name: 'new_user',
          email: 'default@email.com',
          password: '3334455'
        },
        headers: {
          Authorization: token
        }
      })

      const result = JSON.parse(res.payload)

      expect(result.statusCode).toBe(422)
      expect(result.message).toBe('Email is already in use')
      done()
    })
  })

  describe('PUT /users/:id', () => {
    it('Update a user', async done => {
      const res = await server.inject({
        method: 'PUT',
        url: `/users/${defaultId}`,
        payload: {
          name: 'updated_user',
          email: 'updated_user@gmail.com',
          password: '32134543'
        },
        headers: {
          Authorization: token
        }
      })

      const result = JSON.parse(res.payload)

      expect(res.statusCode).toBe(200)
      expect(result.data.id).toBe(defaultId)
      expect(result.data.name).toBe('updated_user')
      expect(result.data.email).toBe('updated_user@gmail.com')
      done()
    })

    it('Should returns 422 status code when the email informed is already in use', async done => {
      const newUser = {
        name: 'default_user',
        email: 'updated_user@gmail.com',
        password: '123456'
      }

      const user = new User(newUser)
      await user.save()

      const res = await server.inject({
        method: 'PUT',
        url: `/users/${defaultId}`,
        payload: {
          name: 'updated_user',
          email: 'updated_user@gmail.com',
          password: '32134543'
        },
        headers: {
          Authorization: token
        }
      })

      const result = JSON.parse(res.payload)

      expect(res.statusCode).toBe(422)
      expect(result.message).toBe('Email is already in use')
      done()
    })
  })

  it('DELETE /users/:id - Delete a user', async done => {
    const res = await server.inject({
      method: 'DELETE',
      url: `/users/${defaultId}`,
      headers: {
        Authorization: token
      }
    })
    expect(res.statusCode).toBe(204)
    done()
  })
})

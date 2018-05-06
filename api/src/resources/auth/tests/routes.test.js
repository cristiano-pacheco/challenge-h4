'use strict'

const mongoose = require('mongoose')

const { server } = require('../../../server')
const UserSchema = require('../../users/schema')

describe('/login', () => {
  afterAll(() => mongoose.disconnect())

  const defaultId = '5ad93a00404dbaa84bc41a73'

  const defaultUser = {
    id: defaultId,
    name: 'default_user',
    email: 'default@email.com',
    password: '$2a$10$nSooSNtd7yftmI0SXsojtu.B091VDAWtH2HjAKI8Yop.vau4XLF2e'
  }

  beforeEach(async done => {
    const user = new UserSchema(defaultUser)
    user._id = defaultId
    await UserSchema.remove({})
    await user.save()
    done()
  })

  describe('POST /login', () => {
    it('Should authenticate the user and return a token', async done => {
      const res = await server.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'default@email.com',
          password: '123'
        }
      })

      expect(res.statusCode).toBe(200)

      const result = JSON.parse(res.payload)
      expect(Object.keys(result)[0]).toBe('token')
      done()
    })

    it('Should returns the 401 status code when the login data is incorrect', async done => {
      const res = await server.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'default@email.com',
          password: '1234'
        }
      })

      expect(res.statusCode).toBe(401)
      done()
    })
  })
})

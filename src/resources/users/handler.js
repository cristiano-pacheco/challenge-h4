'use strict'

const Bcrypt = require('bcrypt-nodejs')
const Boom = require('boom')
const BaseHandler = require('../base/handler')
const { UserRepository } = require('./repository')

class UserHandler extends BaseHandler {
  constructor (repository) {
    super(repository)
    this.repository = repository
  }

  async create (req, h) {
    try {
      let { payload } = req

      const emailInUse = await this.repository.emailInUse(payload.email)

      if (emailInUse) {
        return Boom.badData('Email is already in use')
      }

      payload.password = Bcrypt.hashSync(payload.password)
      payload.email = payload.email.toLowerCase()

      const { _id, name, email } = await this.repository.create(payload)
      const result = {
        data: { _id, name, email }
      }

      return h.response(result).code(201)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update (req, h) {
    try {
      let { payload } = req
      const { id } = req.params

      const emailInUse = await this.repository.emailInUse(payload.email, id)

      if (emailInUse) {
        return Boom.badData('Email is already in use')
      }

      payload.email = payload.email.toLowerCase()

      if (req.payload.password) {
        payload.password = Bcrypt.hashSync(payload.password)
      }

      await this.repository.update(req.params.id, payload)

      const result = {
        data: {
          id: req.params.id,
          ...payload
        }
      }

      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = {
  UserHandlerClass: UserHandler,
  UserHandler: new UserHandler(UserRepository)
}

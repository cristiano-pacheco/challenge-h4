'use strict'

const Joi = require('joi')

const AuthHandler = require('./handler')

module.exports = [
  {
    path: '/login',
    method: 'POST',
    handler: async (req, res) => AuthHandler.login(req, res),
    config: {
      auth: false,
      tags: ['api'],
      description: 'Login',
      notes: 'Should login a user',
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required().max(100)
        }
      }
    }
  }
]

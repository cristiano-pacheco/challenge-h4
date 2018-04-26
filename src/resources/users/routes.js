'use strict'

const Joi = require('joi')

const { headers } = require('../../utils/validation')
const { UserHandler } = require('./handler')

const list = {
  path: '/users',
  method: 'GET',
  handler: (req, h) => UserHandler.list(req, h),
  config: {
    description: 'List all the users',
    tags: ['api'],
    validate: {
      headers
    }
  }
}

const findOne = {
  path: '/users/{id}',
  method: 'GET',
  handler: (req, h) => UserHandler.findOne(req, h),
  config: {
    description: 'Get a user',
    tags: ['api'],
    validate: {
      headers,
      params: {
        id: Joi.string().required()
      }
    }
  }
}

const create = {
  path: '/users',
  method: 'POST',
  handler: (req, h) => UserHandler.create(req, h),
  config: {
    description: 'Creates an user',
    tags: ['api'],
    validate: {
      headers,
      payload: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })
    }
  }
}

const update = {
  path: '/users/{id}',
  method: 'PUT',
  handler: (req, h) => UserHandler.update(req, h),
  config: {
    description: 'Updates a user',
    tags: ['api'],
    validate: {
      headers,
      params: {
        id: Joi.string().required()
      },
      payload: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })
    }
  }
}

const remove = {
  path: '/users/{id}',
  method: 'DELETE',
  handler: (req, h) => UserHandler.remove(req, h),
  config: {
    description: 'Delete a user',
    tags: ['api'],
    validate: {
      headers,
      params: {
        id: Joi.string().required()
      }
    }
  }
}

module.exports = [
  list,
  findOne,
  create,
  update,
  remove
]

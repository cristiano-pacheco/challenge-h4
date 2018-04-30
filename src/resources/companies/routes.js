'use strict'

const Joi = require('joi')

const { authHeader } = require('../../utils/validation')
const { CompanyHandler } = require('./handler')
const positionEnum = require('./position-enum')

const list = {
  path: '/companies',
  method: 'GET',
  handler: (req, h) => CompanyHandler.list(req, h),
  config: {
    auth: false,
    description: 'List all the companies',
    tags: ['api'],
    validate: {
      headers: authHeader
    }
  }
}

const findOne = {
  path: '/companies/{id}',
  method: 'GET',
  handler: (req, h) => CompanyHandler.findOne(req, h),
  config: {
    description: 'Get a company',
    tags: ['api'],
    validate: {
      headers: authHeader,
      params: {
        id: Joi.string().required()
      }
    }
  }
}

const create = {
  path: '/companies',
  method: 'POST',
  handler: (req, h) => CompanyHandler.create(req, h),
  config: {
    auth: false,
    description: 'Creates a company',
    tags: ['api'],
    validate: {
      headers: authHeader,
      payload: Joi.object({
        name: Joi.string().required(),
        cnpj: Joi.string().required(),
        employees: Joi.array().items(Joi.object({
          name: Joi.string().required(),
          birthDate: Joi.date().required(),
          position: Joi.string().valid(positionEnum).required()
        }))
      })
    }
  }
}

const update = {
  path: '/companies/{id}',
  method: 'PUT',
  handler: (req, h) => CompanyHandler.update(req, h),
  config: {
    description: 'Update a company',
    tags: ['api'],
    validate: {
      headers: authHeader,
      params: {
        id: Joi.string().required()
      },
      payload: Joi.object({
        name: Joi.string().required(),
        cnpj: Joi.string().required(),
        employees: Joi.array().items(Joi.object({
          name: Joi.string().required(),
          birthDate: Joi.date().required(),
          position: Joi.string().valid(positionEnum).required()
        }))
      })
    }
  }
}

const remove = {
  path: '/companies/{id}',
  method: 'DELETE',
  handler: (req, h) => CompanyHandler.remove(req, h),
  config: {
    description: 'Delete a company',
    tags: ['api'],
    validate: {
      headers: authHeader,
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

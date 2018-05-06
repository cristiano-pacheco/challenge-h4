'use strict'

const Joi = require('joi')

const { authHeader } = require('../../utils/validation')
const { EmployeeHandler } = require('./handler')
const positionEnum = require('../companies/position-enum')

const list = {
  path: '/companies/{id}/employees',
  method: 'GET',
  handler: (req, h) => EmployeeHandler.list(req, h),
  config: {
    description: 'List all the employees of the company',
    tags: ['api'],
    validate: {
      headers: authHeader,
      params: {
        id: Joi.string().required()
      }
    }
  }
}

const findOne = {
  path: '/companies/{id}/employees/{employeeId}',
  method: 'GET',
  handler: (req, h) => EmployeeHandler.findOne(req, h),
  config: {
    description: 'Get the employee',
    tags: ['api'],
    validate: {
      headers: authHeader,
      params: {
        id: Joi.string().required(),
        employeeId: Joi.string().required()
      }
    }
  }
}

const create = {
  path: '/companies/{id}/employees',
  method: 'POST',
  handler: (req, h) => EmployeeHandler.create(req, h),
  config: {
    description: 'Creates an employee',
    tags: ['api'],
    validate: {
      headers: authHeader,
      payload: {
        name: Joi.string().required(),
        age: Joi.string().required(),
        birthDate: Joi.date().required(),
        position: Joi.string().valid(positionEnum).required(),
        user: Joi.string().required()
      },
      params: {
        id: Joi.string().required()
      }
    }
  }
}

const update = {
  path: '/companies/{id}/employees/{employeeId}',
  method: 'PUT',
  handler: (req, h) => EmployeeHandler.update(req, h),
  config: {
    description: 'Update an employee',
    tags: ['api'],
    validate: {
      headers: authHeader,
      payload: {
        name: Joi.string().required(),
        age: Joi.string().required(),
        birthDate: Joi.date().required(),
        position: Joi.string().valid(positionEnum).required(),
        user: Joi.string().required()
      },
      params: {
        id: Joi.string().required(),
        employeeId: Joi.string().required()
      }
    }
  }
}

const remove = {
  path: '/companies/{id}/employees/{employeeId}',
  method: 'DELETE',
  handler: (req, h) => EmployeeHandler.remove(req, h),
  config: {
    description: 'Delete an employee',
    tags: ['api'],
    validate: {
      headers: authHeader,
      params: {
        id: Joi.string().required(),
        employeeId: Joi.string().required()
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

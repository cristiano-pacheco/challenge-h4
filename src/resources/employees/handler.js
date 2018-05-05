'use strict'

const Boom = require('boom')
const BaseHandler = require('../base/handler')
const { EmployeeRepository } = require('./repository')

class EmployeeHandler extends BaseHandler {
  constructor (repository) {
    super(repository)
    this.repository = repository
  }

  async list (req, h) {
    try {
      const { id } = req.params
      const result = await this.repository.find(id)

      if (!result) {
        return Boom.notFound('Resource not found.')
      }

      return { data: result[0].employees }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findOne (req, h) {
    try {
      const { id, employeeId } = req.params

      const result = await this.repository.findByCompanyIdAndEmployeeId(id, employeeId)
      if (!result) {
        return Boom.notFound('Resource not found.')
      }
      return { data: result }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async create (req, h) {
    try {
      const { id } = req.params

      const company = await this.repository.findCompanyById(id)

      if (!company) {
        return Boom.notFound('Company is not found')
      }

      const employee = await this.repository.findByCompanyIdAndUserId(id, req.payload.user)

      if (employee) {
        return Boom.badData('The informed user is already an employee of the company.')
      }

      const data = await this.repository.addEmployee(id, req.payload)

      return h.response({ data }).code(201)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update (req, h) {
    try {
      const { id, employeeId } = req.params

      const company = await this.repository.findCompanyById(id)

      if (!company) {
        return Boom.notFound('Company is not found')
      }

      await this.repository.updateEmployee(id, employeeId, req.payload)

      return { data: { id, ...req.payload } }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async remove (req, h) {
    try {
      const { id, employeeId } = req.params

      if (!await this.repository.findCompanyById(id).count()) {
        return Boom.notFound('Resource not found.')
      }

      await this.repository.remove(id, employeeId)
      return h.response().code(204)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = {
  EmployeeHandlerClass: EmployeeHandler,
  EmployeeHandler: new EmployeeHandler(EmployeeRepository)
}

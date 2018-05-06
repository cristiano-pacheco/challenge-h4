'use strict'

const Boom = require('boom')
const cnpj = require('@fnando/cnpj/dist/node')
const BaseHandler = require('../base/handler')
const { CompanyRepository } = require('./repository')

class CompanyHandler extends BaseHandler {
  constructor (repository) {
    super(repository)
    this.repository = repository
  }

  async create (req, h) {
    try {
      const { payload } = req

      if (!cnpj.isValid(payload.cnpj)) {
        return Boom.badData('Cnpj is invalid')
      }

      const cnpjInUse = await this.repository.cnpjInUse(payload.cnpj)

      if (cnpjInUse) {
        return Boom.badData('Cnpj is already in use')
      }

      const data = await this.repository.create(payload)
      return h.response({ data }).code(201)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update (req, h) {
    try {
      const { payload } = req
      const { id } = req.params

      if (!(await this.repository.findOne(id).count())) {
        return Boom.notFound('Resource not found.')
      }

      if (!cnpj.isValid(payload.cnpj)) {
        return Boom.badData('Cnpj is invalid')
      }

      const cnpjInUse = await this.repository.cnpjInUse(payload.cnpj, id)

      if (cnpjInUse) {
        return Boom.badData('Cnpj is already in use')
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
  CompanyHandlerClass: CompanyHandler,
  CompanyHandler: new CompanyHandler(CompanyRepository)
}

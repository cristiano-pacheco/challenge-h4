'use strict'

class BaseHandler {
  constructor (repository) {
    this.repository = repository
  }

  async list (req, h) {
    try {
      const result = await this.repository.find()
      return { data: result }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findOne (req, h) {
    try {
      const result = await this.repository.findOne(req.params.id)
      return { data: result }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async create (req, h) {
    try {
      const data = await this.repository.create(req.payload)
      return h.response({ data }).code(201)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update (req, h) {
    try {
      await this.repository.update(req.params.id, req.payload)
      return { data: { id: req.params.id, ...req.payload } }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async remove (req, h) {
    try {
      await this.repository.remove(req.params.id)
      return h.response().code(204)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = BaseHandler

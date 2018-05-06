'use strict'

class BaseRepository {
  constructor (schema) {
    this.schema = schema
  }

  find (query = {}) {
    return this.schema.find(query)
  }

  findOne (id) {
    return this.schema.findById(id)
  }

  create (data) {
    return this.schema.create(data)
  }

  update (id, data) {
    return this.schema.update({ _id: id }, { $set: data })
  }

  remove (id) {
    return this.schema.remove({ _id: id })
  }
}

module.exports = BaseRepository

'use strict'

const schema = require('./schema')
const BaseRepository = require('../base/repository')

class UserRepository extends BaseRepository {
  constructor (schema) {
    super(schema)
    this.schema = schema
  }

  emailInUse (email, id = null) {
    if (!id) {
      return this.schema.find({ email }).count()
    }
    return this.schema.find({ email, _id: { $ne: id } }).count()
  }
}

module.exports = {
  UserRepositoryClass: UserRepository,
  UserRepository: new UserRepository(schema)
}

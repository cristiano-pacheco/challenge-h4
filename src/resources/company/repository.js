'use strict'

const schema = require('./schema')
const BaseRepository = require('../base/repository')

class CompanyRepository extends BaseRepository {
  constructor (schema) {
    super(schema)
    this.schema = schema
  }

  cnpjInUse (cnpj, id = null) {
    if (!id) {
      return this.schema.find({ cnpj }).count()
    }
    return this.schema.find({ cnpj, _id: { $ne: id } }).count()
  }
}

module.exports = {
  CompanyRepositoryClass: CompanyRepository,
  CompanyRepository: new CompanyRepository(schema)
}

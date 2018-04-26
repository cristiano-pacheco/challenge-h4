'use strict'

const Joi = require('joi')

const headers = Joi.object({
  authorization: Joi.string().required()
}).unknown()

module.exports = {
  headers
}

'use strict'

const Joi = require('joi')

const authHeader = Joi.object({
  authorization: Joi.string().required()
}).unknown()

module.exports = {
  authHeader
}

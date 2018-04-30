'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const positionEnum = require('./position-enum')

const companySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true,
    index: { unique: true }
  },
  employees: [{
    name: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date,
      required: true
    },
    position: {
      type: String,
      enum: positionEnum,
      required: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  }]
})

companySchema.virtual('age').get(function () {
  const age = moment(new Date()).diff(this.birthDate, 'years')
  return age
})

module.exports = mongoose.model('Company', companySchema)

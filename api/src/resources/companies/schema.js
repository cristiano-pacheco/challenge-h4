'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
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
    age: {
      type: Number,
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
      ref: 'User',
      required: true
    }
  }]
})

function autopopulate (next) {
  this.populate('employees.user')
  next()
}

companySchema.pre('find', autopopulate)
companySchema.pre('findOne', autopopulate)
companySchema.pre('findById', autopopulate)

module.exports = mongoose.model('Company', companySchema)

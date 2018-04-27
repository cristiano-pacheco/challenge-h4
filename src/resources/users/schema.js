'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

module.exports = mongoose.model('User', userSchema, 'users')

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
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
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // }
})

module.exports = mongoose.model('User', userSchema, 'users')

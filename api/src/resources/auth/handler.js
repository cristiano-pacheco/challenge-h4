'use strict'

const Boom = require('boom')
const Jwt = require('jsonwebtoken')
const Bcrypt = require('bcrypt-nodejs')

const UserSchema = require('../users/schema')

const AuthHandler = {
  login: async (req, h) => {
    const { email, password } = req.payload

    const user = await UserSchema.findOne({ email }, { password: 1 })

    if (!user) {
      return Boom.unauthorized('Incorrect email or password')
    }

    if (Bcrypt.compareSync(password, user.password)) {
      const token = Jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '30M' })
      return { token }
    }

    return Boom.unauthorized('Incorrect email or password')
  }
}

module.exports = AuthHandler

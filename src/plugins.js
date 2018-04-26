'use strict'

const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const HapiJwt = require('hapi-auth-jwt2')

exports.registerSwagger = async server => {
  const swaggerOptions = {
    info: {
      title: 'API Documentation',
      version: '0.0.1'
    }
  }
  try {
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ])
  } catch (error) {
    console.log(error)
    throw error
  }
}

exports.registerRoutes = async server => {
  try {
    await server.register({
      plugin: require('hapi-router'),
      options: {
        routes: 'src/resources/**/routes.js'
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

exports.registerAuthJwt = async server => {
  await server.register(HapiJwt)

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_KEY,
    validate: (decoded, request) => {
      if (decoded) {
        return { isValid: true }
      }
      return { isValid: false }
    },
    verifyOptions: { algorithms: ['HS256'] }
  })

  server.auth.default('jwt')
}

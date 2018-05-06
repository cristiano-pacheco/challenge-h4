'use strict'

const Mongoose = require('mongoose')

const host = process.env.DB_MONGO_HOST || 'localhost'
const port = process.env.DB_MONGO_PORT || '27017'
const db = process.env.DB_MONGO_DATABASE || 'hapiapi'

const MongoDBUrl = `mongodb://${host}:${port}/${db}`

Mongoose.connect(MongoDBUrl)
Mongoose.Promise = global.Promise

const connection = Mongoose.connection

connection.on('error', console.error.bind(console, 'There was an error when trying to connect to the database.'))

// connection.once('open', () => {
//   console.log('Conexão com banco de dados realizada com sucesso!')
// })

exports = connection

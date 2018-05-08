'use strict'

const Mongoose = require('mongoose')

Mongoose.connect(process.env.MONGO_URL)
Mongoose.Promise = global.Promise

const connection = Mongoose.connection

connection.on('error', console.error.bind(console, 'There was an error when trying to connect to the database.'))

// connection.once('open', () => {
//   console.log('Conexão com banco de dados realizada com sucesso!')
// })

exports = connection

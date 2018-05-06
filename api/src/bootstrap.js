'use strict'

const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'prod') {
  dotenv.config({ path: `${__dirname}/../config/.env.prod` })
} else if (process.env.NODE_ENV === 'dev') {
  dotenv.config({ path: `${__dirname}/../config/.env.dev` })
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: `${__dirname}/../config/.env.test` })
}

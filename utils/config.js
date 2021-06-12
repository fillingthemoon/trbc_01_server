require('dotenv').config()

// either Heroku's process.env or server/.env
const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const TOKEN_SECRET = process.env.TOKEN_SECRET

module.exports = {
  MONGODB_URI,
  PORT,
  TOKEN_SECRET,
}
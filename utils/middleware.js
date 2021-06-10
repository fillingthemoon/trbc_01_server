const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')

  next()
}

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'error 404: unknown endpoint' })

  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'Malformatted Id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'Invalid Token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'Session expired. Please log out and log in again.'
    })
  } else if (error.name === 'TypeError') {
    return response.status(401).json({
      error: error.message
    })
  }

  logger.error(error.message)

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  request.token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token

  // Placing this middleware, and this line more specifically,
  // in the controller allows for token authentication.
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

  // Allows us to extract the user attempting to CRUD
  const user = await User.findById(decodedToken.id)
  request.user = user

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
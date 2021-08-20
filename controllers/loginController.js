const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')
const middleware = require('../utils/middleware')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(
    userForToken,
    process.env.TOKEN_SECRET,
    { expiresIn: (60 * 60) * 2 }
  )

  response
    .status(200)
    .send({ token, username: user.username, })
})

loginRouter.post('/stay', middleware.userExtractor, async (request, response) => {
  const body = request.body

  // Check if their email address is verified
  const user = await User.findOne({ username: body.username })
  if (user === null) {
    return response.status(401).json({
      error: 'Invalid username.'
    })
  }

  response
    .status(200)
    .send({ token: request.token, username: user.username, })
})

module.exports = loginRouter
const eventsRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

eventsRouter.get('/', async (request, response) => {
  const items = await Item
    .find({})
  response.json(items)
})

module.exports = eventsRouter
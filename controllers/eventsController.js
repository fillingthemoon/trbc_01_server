const eventsRouter = require('express').Router()
const { Enitem, Chitem } = require('../models/itemModel')
const middleware = require('../utils/middleware')

eventsRouter.get('/', async (request, response) => {
  const items = await Enitem
    .find({
      page: 'home',
      sectionName: 'events'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = eventsRouter
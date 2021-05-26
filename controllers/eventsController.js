const eventsRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

eventsRouter.get('/', async (request, response) => {
  const items = await Item
    .find({
      page: 'home',
      sectionName: 'Events'
    })
    .sort({
      item_id: 'ascending',
    })
  response.json(items)
})

module.exports = eventsRouter
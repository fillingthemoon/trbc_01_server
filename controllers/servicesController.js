const servicesRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

servicesRouter.get('/', async (request, response) => {
  const items = await Item
    .find({
      page: 'services'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = servicesRouter
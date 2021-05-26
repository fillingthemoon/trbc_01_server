const cecRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

cecRouter.get('/', async (request, response) => {
  const items = await Item
    .find({
      page: 'cec',
      sectionName: 'CEC'
    })
    .sort({
      item_id: 'ascending',
    })
  response.json(items)
})

module.exports = cecRouter
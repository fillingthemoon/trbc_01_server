const cecRouter = require('express').Router()
const { Enitem, Chitem } = require('../models/itemModel')
const middleware = require('../utils/middleware')

cecRouter.get('/', async (request, response) => {
  const items = await Enitem
    .find({
      page: 'cec',
      sectionName: 'cec'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = cecRouter
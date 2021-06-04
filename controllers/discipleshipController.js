const discipleshipRouter = require('express').Router()
const { Enitem, Chitem } = require('../models/itemModel')
const middleware = require('../utils/middleware')

discipleshipRouter.get('/', async (request, response) => {
  const items = await Enitem
    .find({
      page: 'discipleship',
      sectionName: 'discipleship'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = discipleshipRouter
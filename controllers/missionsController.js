const missionsRouter = require('express').Router()
const { Enitem, Chitem } = require('../models/itemModel')
const middleware = require('../utils/middleware')

missionsRouter.get('/', async (request, response) => {
  const items = await Enitem
    .find({
      page: 'missions',
      sectionName: 'missions'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = missionsRouter
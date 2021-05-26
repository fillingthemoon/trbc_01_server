const missionsRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

missionsRouter.get('/', async (request, response) => {
  const items = await Item
    .find({ page: 'missions', sectionName: 'Missions' })
  response.json(items)
})

module.exports = missionsRouter
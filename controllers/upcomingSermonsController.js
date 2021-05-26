const upcomingSermonsRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

upcomingSermonsRouter.get('/', async (request, response) => {
  const items = await Item
    .find({ page: 'home', sectionName: 'Upcoming Sermons' })
  response.json(items)
})

module.exports = upcomingSermonsRouter
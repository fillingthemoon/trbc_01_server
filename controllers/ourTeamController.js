const ourTeamRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

ourTeamRouter.get('/', async (request, response) => {
  const items = await Item
    .find({
      page: 'our-team'
    })
    .sort({
      item_id: 'ascending',
    })
  response.json(items)
})

module.exports = ourTeamRouter
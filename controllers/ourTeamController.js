const ourTeamRouter = require('express').Router()
const { Enitem, Chitem } = require('../models/itemModel')
const middleware = require('../utils/middleware')

ourTeamRouter.get('/', async (request, response) => {
  const items = await Enitem
    .find({
      page: 'our-team'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = ourTeamRouter
const ourHistoryRouter = require('express').Router()
const { Enitem, Chitem } = require('../models/itemModel')
const middleware = require('../utils/middleware')

ourHistoryRouter.get('/', async (request, response) => {
  const items = await Enitem
    .find({
      page: 'our-history',
      sectionName: 'our-history'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = ourHistoryRouter
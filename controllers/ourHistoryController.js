const ourHistoryRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

ourHistoryRouter.get('/', async (request, response) => {
  const items = await Item
    .find({
      page: 'our-history',
      sectionName: 'Our History'
    })
    .sort({
      item_id: 'ascending',
    })
  response.json(items)
})

module.exports = ourHistoryRouter
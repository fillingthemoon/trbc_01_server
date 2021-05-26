const outreachRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

outreachRouter.get('/', async (request, response) => {
  const items = await Item
    .find({
      page: 'outreach'
    })
    .sort({
      item_id: 'ascending',
    })
  response.json(items)
})

module.exports = outreachRouter
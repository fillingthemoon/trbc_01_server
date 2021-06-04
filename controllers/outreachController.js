const outreachRouter = require('express').Router()
const { Enitem, Chitem } = require('../models/itemModel')
const middleware = require('../utils/middleware')

outreachRouter.get('/', async (request, response) => {
  const items = await Enitem
    .find({
      page: 'outreach'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = outreachRouter
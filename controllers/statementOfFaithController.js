const statementOfFaithRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

statementOfFaithRouter.get('/', async (request, response) => {
  const items = await Item
    .find({
      page: 'statement-of-faith',
      sectionName: 'Statement of Faith'
    })
    .sort({
      item_id: 'ascending',
    })
  response.json(items)
})

module.exports = statementOfFaithRouter
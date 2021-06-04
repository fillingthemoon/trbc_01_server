const statementOfFaithRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

statementOfFaithRouter.get('/', async (request, response) => {
  const items = await Item
    .find({
      page: 'statement-of-faith',
      sectionName: 'statement-of-faith'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = statementOfFaithRouter
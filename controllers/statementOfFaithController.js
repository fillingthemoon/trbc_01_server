const statementOfFaithRouter = require('express').Router()
const { Enitem, Chitem } = require('../models/itemModel')
const middleware = require('../utils/middleware')

statementOfFaithRouter.get('/', async (request, response) => {
  const items = await Enitem
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
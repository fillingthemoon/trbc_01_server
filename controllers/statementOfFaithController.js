const statementOfFaithRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

const { filterItemsByLanguage } = require('../helper-files/helperFunctions')

statementOfFaithRouter.get('/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const items = await Item
    .find({
      page: 'statement-of-faith',
      pageSection: 'statement-of-faith'
    })
    .sort({
      itemId: 'ascending',
    })

  // Get either english or chinese data depending on request.params.langId
  const filteredItems = filterItemsByLanguage(items, request.params.langId)

  response.json(filteredItems)
})

module.exports = statementOfFaithRouter
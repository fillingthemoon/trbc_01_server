const cecRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

cecRouter.get('/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const items = await Item
    .find({
      page: 'cec',
      pageSection: 'cec'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = cecRouter
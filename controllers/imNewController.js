const imNewRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

imNewRouter.get('/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const items = await Item
    .find({
      page: 'im-new',
      sectionName: 'im-new'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = imNewRouter
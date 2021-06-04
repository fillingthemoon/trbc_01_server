const ourHistoryRouter = require('express').Router()
const { Enitem, Chitem } = require('../models/itemModel')
const middleware = require('../utils/middleware')

ourHistoryRouter.get('/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const Item = request.params.langId === 'ch' ? Chitem : Enitem

  const items = await Item
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
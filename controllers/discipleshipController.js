const discipleshipRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

discipleshipRouter.get('/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const items = await Item
    .find({
      page: 'discipleship',
      pageSection: 'discipleship'
    })
    .sort({
      itemId: 'ascending',
    })

  // Get either english or chinese data depending on request.params.langId
  const filteredItems = items.map(item => {
    const { _id, page, pageSection, ...rest } = item
    const langItem = request.params.langId === 'en' ? item.itemEn : item.itemCh
    return { _id, page, pageSection, ...langItem }
  })

  response.json(filteredItems)
})

module.exports = discipleshipRouter
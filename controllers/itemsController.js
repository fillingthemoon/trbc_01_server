const itemsRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

const { filterItemByLanguage, filterItemsByLanguage } = require('../helper-files/helperFunctions')

itemsRouter.get('/all/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const items = await Item
    .find({})
    .sort({
      itemId: 'ascending',
    })

  // Get either english or chinese data depending on request.params.langId
  const filteredItems = filterItemsByLanguage(items, request.params.langId)

  response.json(filteredItems)
})

// Returns null if the item's id doesn't exist
itemsRouter.get('/item/:id/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const item = await Item
    .findById(request.params.id)

  // Get either english or chinese data depending on request.params.langId
  const filteredItem = filterItemByLanguage(item, request.params.langId)

  response.json(filteredItem)
})

itemsRouter.get('/pages/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  // Hardcode pages/pageSections to avoid missing out on them if 0 data available
  const itemsCondensed = {
    'discipleship': ['discipleship'],
    'home': ['announcements', 'events', 'upcoming-sermons'],
    'im-new': ['im-new'],
    'missions': ['missions'],
    'our-history': ['our-history'],
    'our-team': ['administrative', 'ministry', 'pastoral'],
    'outreach': ['outreach'],
    'services': ['english-service', 'sunset-service-english-mandarin', 'teo-chew-chinese-service'],
    'statement-of-faith': ['statement-of-faith'],
  }

  const items = Object.keys(itemsCondensed).map(page => {
    return {
      _id: page,
      pageSections: itemsCondensed[page].map(pageSection => {
        return {
          _id: pageSection
        }
      })
    }
  })

  response.json(items)
})

module.exports = itemsRouter
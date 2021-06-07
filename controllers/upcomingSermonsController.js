const upcomingSermonsRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

const { filterItemsByLanguage } = require('../helper-files/helperFunctions')

upcomingSermonsRouter.get('/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const items = await Item
    .find({
      page: 'home',
      pageSection: 'upcoming-sermons'
    })
    .sort({
      itemId: 'ascending',
    })

  // Get either english or chinese data depending on request.params.langId
  const filteredItems = filterItemsByLanguage(items, request.params.langId)

  response.json(filteredItems)
})

// Returns null if the item's id doesn't exist
upcomingSermonsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const maxItemId = (
    await Item
      .findOne({
        page: 'home',
        pageSection: 'upcoming-sermons'
      })
      .sort('-itemId')
  ).itemId

  const upcomingSermon = new Item({
    itemId: maxItemId + 1,
    page: body.page,
    pageSection: body.pageSection,
    itemEn: body.itemEn,
    itemCh: body.itemCh,
  })

  const savedUpcomingSermon = await upcomingSermon.save()

  response.status(201).json(savedUpcomingSermon)
})

upcomingSermonsRouter.put('/:id/', middleware.userExtractor, async (request, response) => {
  const upcomingSermon = request.body

  const result = await Item.findByIdAndUpdate(request.params.id, upcomingSermon, { new: true })
  response.json(result)
})

upcomingSermonsRouter.delete('/:id/', middleware.userExtractor, async (request, response) => {
  await Item.findByIdAndRemove(request.params.id)
  response.status(204).send()
})

module.exports = upcomingSermonsRouter
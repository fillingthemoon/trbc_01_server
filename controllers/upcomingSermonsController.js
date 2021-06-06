const upcomingSermonsRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

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
  const filteredItems = items.map(item => {
    const { _id, page, pageSection, ...rest } = item
    const langItem = request.params.langId === 'en' ? item.itemEn : item.itemCh
    return { _id, page, pageSection, ...langItem }
  })

  response.json(filteredItems)
})

// Returns null if the item's id doesn't exist
upcomingSermonsRouter.post('/:langId', middleware.userExtractor, async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

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

upcomingSermonsRouter.put('/:id/:langId', middleware.userExtractor, async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const upcomingSermon = request.body

  const result = await Item.findByIdAndUpdate(request.params.id, upcomingSermon, { new: true })
  response.json(result)
})

upcomingSermonsRouter.delete('/:id/:langId', middleware.userExtractor, async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  await Item.findByIdAndRemove(request.params.id)
  response.status(204).send()
})

module.exports = upcomingSermonsRouter
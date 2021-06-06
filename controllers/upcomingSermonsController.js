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
      sectionName: 'upcoming-sermons'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
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
        sectionName: 'upcoming-sermons'
      })
      .sort('-itemId')
  ).itemId

  const upcomingSermon = new Item({
    itemId: maxItemId + 1,
    page: body.page,
    sectionName: body.sectionName,
    title: body.title,
    text: body.text,
    details: body.details,
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
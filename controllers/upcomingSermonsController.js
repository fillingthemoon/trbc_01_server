const upcomingSermonsRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

upcomingSermonsRouter.get('/', async (request, response) => {
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

upcomingSermonsRouter.post('/', middleware.userExtractor, async (request, response) => {
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

upcomingSermonsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const upcomingSermon = request.body

  const result = await Item.findByIdAndUpdate(request.params.id, upcomingSermon, { new: true })
  response.json(result)
})

upcomingSermonsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  await Item.findByIdAndRemove(request.params.id)
  response.status(204).send()
})

module.exports = upcomingSermonsRouter
const upcomingSermonsRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

upcomingSermonsRouter.get('/', async (request, response) => {
  const items = await Item
    .find({
      page: 'home',
      sectionName: 'Upcoming Sermons'
    })
    .sort({
      item_id: 'ascending',
    })
  response.json(items)
})

upcomingSermonsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const maxItemId = (
    await Item
      .findOne({
        page: 'home',
        sectionName: 'Upcoming Sermons'
      })
      .sort('-item_id')
  ).item_id

  const upcomingSermon = new Item({
    item_id: maxItemId + 1,
    page: body.page,
    sectionName: body.sectionName,
    title: body.title,
    text: body.text,
    details: body.details,
  })

  const savedUpcomingSermon = await upcomingSermon.save()

  response.status(201).json(savedUpcomingSermon)
})

module.exports = upcomingSermonsRouter
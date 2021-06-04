const announcementsRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

announcementsRouter.get('/', async (request, response) => {
  const items = await Item
    .find({
      page: 'home',
      sectionName: 'announcements'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = announcementsRouter
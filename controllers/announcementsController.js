const announcementsRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

announcementsRouter.get('/', async (request, response) => {
  const items = await Item
    .find({ page: 'home', sectionName: 'Announcements' })
  response.json(items)
})

module.exports = announcementsRouter
const imNewRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

imNewRouter.get('/', async (request, response) => {
  const items = await Item
    .find({
      page: 'im-new',
      sectionName: 'I\'m New'
    })
    .sort({
      item_id: 'ascending',
    })
  response.json(items)
})

module.exports = imNewRouter
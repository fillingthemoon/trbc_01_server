const imNewRouter = require('express').Router()
const { Enitem, Chitem } = require('../models/itemModel')
const middleware = require('../utils/middleware')

imNewRouter.get('/', async (request, response) => {
  const items = await Enitem
    .find({
      page: 'im-new',
      sectionName: 'im-new'
    })
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

module.exports = imNewRouter
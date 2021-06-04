const itemsRouter = require('express').Router()
const { Enitem, Chitem } = require('../models/itemModel')
const middleware = require('../utils/middleware')

itemsRouter.get('/all/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const Item = request.params.langId === 'ch' ? Chitem : Enitem

  const items = await Item
    .find({})
    .sort({
      itemId: 'ascending',
    })
  response.json(items)
})

// Adding :langId to the end may not work for this one
itemsRouter.get('/item/:id/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const Item = request.params.langId === 'ch' ? Chitem : Enitem

  const item = await Item
    .findById(request.params.id)
  response.json(item)
})

// Can just use English for this
itemsRouter.get('/pages/', async (request, response) => {
  const items = await Enitem
    .aggregate([
      {
        $group: {
          _id: '$page'
        }
      },
      {
        $lookup: {
          from: 'enitems', // Need to change this when changing collection names!
          let: { page: '$_id' }, // localField

          // pipeline to manage lookup-data ()
          pipeline: [
            {
              $match: {
                $expr: {
                  // $page is foreignField
                  // $$page is localField
                  $eq: ['$page', '$$page']
                }
              }
            },
            {
              // group by sectionName
              $group: {
                _id: '$sectionName',
              }
            },
            {
              $sort: {
                _id: 1,
              }
            },
          ],
          as: 'items',
        },
      },
      {
        $sort: {
          _id: 1,
        }
      }
    ])
  response.json(items)
})

module.exports = itemsRouter
const itemsRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

itemsRouter.get('/all/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const items = await Item
    .find({})
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
itemsRouter.get('/item/:id/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const item = await Item
    .findById(request.params.id)

  // Get either english or chinese data depending on request.params.langId
  const { _id, page, pageSection, ...rest } = item
  const langItem = request.params.langId === 'en' ? item.itemEn : item.itemCh
  const filteredItem = { _id, page, pageSection, ...langItem }

  response.json(filteredItem)
})

itemsRouter.get('/pages/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const items = await Item
    .aggregate([
      {
        $group: {
          _id: '$page'
        }
      },
      {
        $lookup: {
          from: 'items',
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
              // group by pageSection
              $group: {
                _id: '$pageSection',
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
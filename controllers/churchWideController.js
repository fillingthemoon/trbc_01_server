const churchWideRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

const { filterItemByLanguage, filterItemsByLanguage } = require('../helper-files/helperFunctions')

churchWideRouter.get('/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const items = await Item
    .find({
      page: 'church-wide'
    })
    .sort({
      itemId: 'ascending',
    })

  // Get either english or chinese data depending on request.params.langId
  const filteredItems = filterItemsByLanguage(items, request.params.langId)

  response.json(filteredItems)
})

// Returns null if the item's id doesn't exist
churchWideRouter.post('/:langId', middleware.userExtractor, async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const body = request.body

  const itemWithMaxId = (
    await Item
      .findOne({
        page: 'church-wide',
      })
      .sort('-itemId')
  )

  const churchWide = new Item({
    itemId: itemWithMaxId ? itemWithMaxId.itemId + 1 : 1,
    page: body.page,
    pageSection: body.pageSection,
    itemEn: body.itemEn,
    itemCh: body.itemCh,
  })

  const savedChurchWide = await churchWide.save()

  // Get either english or chinese data depending on request.params.langId
  const filteredItem = filterItemByLanguage(savedChurchWide, request.params.langId)

  response.status(201).json(filteredItem)
})

churchWideRouter.put('/:id/:langId', middleware.userExtractor, async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const updatedChurchWide = request.body

  const updatedItem = await Item.findByIdAndUpdate(request.params.id, updatedChurchWide, { new: true })

  // Get either english or chinese data depending on request.params.langId
  const filteredItem = filterItemByLanguage(updatedItem, request.params.langId)

  response.json(filteredItem)
})

churchWideRouter.delete('/:id/', middleware.userExtractor, async (request, response) => {
  await Item.findByIdAndRemove(request.params.id)
  response.status(204).send()
})

module.exports = churchWideRouter
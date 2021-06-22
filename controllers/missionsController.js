const missionsRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

const { filterItemByLanguage, filterItemsByLanguage } = require('../helper-files/helperFunctions')

missionsRouter.get('/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const items = await Item
    .find({
      page: 'missions',
      pageSection: 'missions'
    })
    .sort({
      itemId: 'ascending',
    })

  // Get either english or chinese data depending on request.params.langId
  const filteredItems = filterItemsByLanguage(items, request.params.langId)

  response.json(filteredItems)
})

missionsRouter.post('/:langId', middleware.userExtractor, async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const body = request.body

  const itemWithMaxId = (
    await Item
      .findOne({
        page: 'missions',
      })
      .sort('-itemId')
  )

  const mission = new Item({
    itemId: itemWithMaxId ? itemWithMaxId.itemId + 1 : 1,
    page: body.page,
    pageSection: body.pageSection,
    itemEn: body.itemEn,
    itemCh: body.itemCh,
  })

  const savedMission = await mission.save()

  // Get either english or chinese data depending on request.params.langId
  const filteredItem = filterItemByLanguage(savedMission, request.params.langId)

  response.status(201).json(filteredItem)
})

missionsRouter.put('/:id/:langId', middleware.userExtractor, async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const updatedMission = request.body

  const updatedItem = await Item.findByIdAndUpdate(request.params.id, updatedMission, { new: true })

  // Get either english or chinese data depending on request.params.langId
  const filteredItem = filterItemByLanguage(updatedItem, request.params.langId)

  response.json(filteredItem)
})

missionsRouter.delete('/:id/', middleware.userExtractor, async (request, response) => {
  await Item.findByIdAndRemove(request.params.id)
  response.status(204).send()
})

module.exports = missionsRouter
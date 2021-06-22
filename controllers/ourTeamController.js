const ourTeamRouter = require('express').Router()
const { Item } = require('../models/itemModel')
const middleware = require('../utils/middleware')

const { filterItemByLanguage, filterItemsByLanguage } = require('../helper-files/helperFunctions')

ourTeamRouter.get('/:langId', async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const items = await Item
    .find({
      page: 'our-team'
    })
    .sort({
      itemId: 'ascending',
    })

  // Get either english or chinese data depending on request.params.langId
  const filteredItems = filterItemsByLanguage(items, request.params.langId)

  response.json(filteredItems)
})

ourTeamRouter.post('/:langId', middleware.userExtractor, async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const body = request.body

  const itemWithMaxId = (
    await Item
      .findOne({
        page: 'our-team',
      })
      .sort('-itemId')
  )

  const ourTeam = new Item({
    itemId: itemWithMaxId ? itemWithMaxId.itemId + 1 : 1,
    page: body.page,
    pageSection: body.pageSection,
    itemEn: body.itemEn,
    itemCh: body.itemCh,
  })

  const savedOurTeam = await ourTeam.save()

  // Get either english or chinese data depending on request.params.langId
  const filteredItem = filterItemByLanguage(savedOurTeam, request.params.langId)

  response.status(201).json(filteredItem)
})

ourTeamRouter.put('/:id/:langId', middleware.userExtractor, async (request, response) => {
  if (!['en', 'ch'].includes(request.params.langId)) {
    response.status(404).send({ error: 'error 404: unknown endpoint' })
  }

  const updatedOurTeam = request.body

  const updatedItem = await Item.findByIdAndUpdate(request.params.id, updatedOurTeam, { new: true })

  // Get either english or chinese data depending on request.params.langId
  const filteredItem = filterItemByLanguage(updatedItem, request.params.langId)

  response.json(filteredItem)
})

ourTeamRouter.delete('/:id/', middleware.userExtractor, async (request, response) => {
  await Item.findByIdAndRemove(request.params.id)
  response.status(204).send()
})

module.exports = ourTeamRouter
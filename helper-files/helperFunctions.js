const filterItemByLanguage = (item, language) => {
  const { id, itemId, page, pageSection, ...rest } = item
  const langItem = language === 'en'
    ? item.itemEn
    : item.itemCh
  const filtereditem = { id, itemId, page, pageSection, ...langItem }

  return filtereditem
}

const filterItemsByLanguage = (items, language) => {
  return items.map(item => filterItemByLanguage(item, language))
}

module.exports = {
  filterItemByLanguage,
  filterItemsByLanguage,
}
/* Keep updated with client/models/itemModel.js */

const mongoose = require('mongoose')

// Need to update AddNewRow.js when more items are added to details
const details = {
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  location: {
    type: String,
  },
  person: {
    type: String,
  },
  passage: {
    type: String,
  },
  type: {
    type: String,
  },
  keyResponsibilities: {
    type: String,
  },
  requirements: {
    type: String,
  },
  linkPath: {
    type: String,
  },
  linkText: {
    type: String,
  },
}

const langItems = {
  service: {
    type: String,
  },
  serviceAcronym: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  details: {
    type: details,
  },
  imgSrc: {
    type: String,
  },
}

const itemEn = {
  pageEn: {
    type: String,
    required: true,
  },
  pageSectionEn: {
    type: String,
    required: true,
  },
  ...langItems,
}

const itemCh = {
  pageCh: {
    type: String,
    required: true,
  },
  pageSectionCh: {
    type: String,
    required: true,
  },
  ...langItems,
}

const itemSchema = new mongoose.Schema({
  itemId: {
    type: Number,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  pageSection: {
    type: String,
    required: true,
  },
  itemEn: {
    type: itemEn,
    required: true,
  },
  itemCh: {
    type: itemCh,
    required: true,
  },
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = {
  Item,
}

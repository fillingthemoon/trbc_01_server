const mongoose = require('mongoose')

const linkSchema = {
  path: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
}

const detailsSchema = {
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
    type: detailsSchema,
  },
  imgSrc: {
    type: String,
  },
  link: {
    type: linkSchema,
  },
}

const itemEnSchema = new mongoose.Schema({
  pageEn: {
    type: String,
    required: true,
  },
  pageSectionEn: {
    type: String,
    required: true,
  },
  ...langItems,
})

const itemChSchema = new mongoose.Schema({
  pageCh: {
    type: String,
    required: true,
  },
  pageSectionCh: {
    type: String,
    required: true,
  },
  ...langItems,
})

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
    type: itemEnSchema,
    required: true,
  },
  itemCh: {
    type: itemChSchema,
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

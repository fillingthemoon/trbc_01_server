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

const itemSchema = new mongoose.Schema({
  item_id: {
    type: Number,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  sectionName: {
    type: String,
    required: true,
  },
  congre: {
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
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
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
  itemId: {
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
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// English Items
const Enitem = mongoose.model('Enitem', itemSchema)

// Chinese Item
const Chitem = mongoose.model('Chitem', itemSchema)

module.exports = {
  Enitem,
  Chitem,
}

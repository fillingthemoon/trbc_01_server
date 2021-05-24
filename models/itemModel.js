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

const eventDetailsSchema = {
  date: {
    type: Date,
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
}

const itemSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true
  },
  sectionName: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
  },
  link: {
    type: linkSchema,
  },
  eventDetails: {
    type: eventDetailsSchema,
  }
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
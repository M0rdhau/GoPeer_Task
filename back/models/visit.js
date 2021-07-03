const mongoose = require('mongoose')

const visitSchema = new mongoose.Schema({
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  },
  link: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link'
  },
})

visitSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Link = mongoose.model('Link', visitSchema)


module.exports = Link
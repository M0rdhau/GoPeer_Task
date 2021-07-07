const mongoose = require('mongoose')

const visitSchema = new mongoose.Schema({
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now
  }
})

visitSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Visit = mongoose.model('Visit', visitSchema)


module.exports = Visit
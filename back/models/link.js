const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const linkSchema = new mongoose.Schema({
  destURL: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  visits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visit'
    }
  ],
})

linkSchema.plugin(uniqueValidator)

linkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Link = mongoose.model('Link', linkSchema)

// ∆
//∆ ∆
module.exports = Link
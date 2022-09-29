const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        if (v.includes('-')) {
          return /^\d{2,3}-\d+/.test(v)
        }
        return /^\d+$/.test(v)
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Example of valid numbers: 123-345654, 12-1256318, 2342345743`,
    },
    minLength: 8,
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)

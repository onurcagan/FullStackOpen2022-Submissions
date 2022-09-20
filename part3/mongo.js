const mongoose = require('mongoose')
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const dbName = 'phonebook'

if (process.argv.length < 5 && process.argv.length !== 3) {
  console.log('Please provide the password, name and number as arguments: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const url = `mongodb+srv://fullstack:${password}@backend-test.oztywpy.mongodb.net/${dbName}?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// Case with only a pw --> node mongo.js <password>
if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected to db to pull all contacts')

      Person.find({}).then((people) => {
        people.map((person) => console.log(person.name, '---', person.number))
        mongoose.connection.close()
      })
    })
    .catch((err) => console.log(err))
}

// Case with pw, name, number
if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected to db to add a contact')

      const person = new Person({
        name: name,
        number: number,
      })

      return person.save()
    })
    .then(() => {
      console.log(`Added ${name}'s number ${number} to the phonebook!`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

require('dotenv').config()
const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()
const cors = require('cors')
const baseUrl = '/api/persons'
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

// let phonebook = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
// ]

morgan.token('content', (request) => request.method === 'POST' && request.body.name && JSON.stringify(request.body))

app.get('/info', (request, response) => {
  const count = Person.count({}, (error, count) =>
    response.status(200).send(`
  <div>Phonebook has info for ${count} people.</div> 
  <div>Request date: ${new Date()}</div>`),
  ).catch((err) => `Some error happened, here's the message: ${err.message}`)
})

app.get(baseUrl, (request, response) => {
  Person.find({}).then((persons) => {
    response.status(200).json(persons)
  })
})

app.get(`${baseUrl}/:id`, (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person)
    })
    .catch((error) =>
      response.status(404).send(`Couldn't fetch the contact with the given ID, here's the error: ${error.message}`),
    )
})

app.put(`${baseUrl}/:id`, (request, response) => {
  Person.findByIdAndUpdate(
    request.params.id,
    {
      number: request.body.number,
    },
    (err, person) => {
      if (err) {
        response.status(404).send(`Couldn't update the contact with the given ID, here's the error: ${err.message}`)
      } else response.status(204).send(`Updated user: ${person.name}`)
    },
  )
})

app.delete(`${baseUrl}/:id`, (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(response.status(204).end())
    .catch((error) =>
      response.status(404).send(`Couldn't delete the contact with the given ID, here's the error: ${error.message}`),
    )
})

app.post(baseUrl, (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'information missing',
    })
  }

  // if (
  //   Person.find((persons) => {
  //     console.log(persons)
  //     persons.map((person) => person.name === body.name)
  //   })
  // ) {
  //   return response.status(400).json({ error: 'name must be unique' })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

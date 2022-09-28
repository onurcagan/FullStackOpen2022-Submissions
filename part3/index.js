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
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())

morgan.token('content', (request) => request.method === 'POST' && request.body.name && JSON.stringify(request.body))

app.get('/info', (request, response, next) => {
  const count = Person.count({}, (error, count) => {
    response.status(200).send(`
  <div>Phonebook has info for ${count} people.</div> 
  <div>Request date: ${new Date()}</div>`)
    next(error)
  })
})

app.get(baseUrl, (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.status(200).json(persons)
    })
    .catch((error) => next(error))
})

app.get(`${baseUrl}/:id`, (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person)
    })
    .catch((error) => next(error))
})

app.put(`${baseUrl}/:id`, async (request, response, next) => {
  const doc = await Person.findById(request.params.id)

  if (!doc) {
    return next('docNotFound')
  }

  doc.number = request.body.number
  await doc.save().catch((error) => next(error))
})

app.delete(`${baseUrl}/:id`, (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) =>
      result === null
        ? response.status(404).send(`The resource you're trying to delete doesn't exist.`)
        : response.status(204).end(),
    )
    .catch((error) => next(error))
})

app.post(baseUrl, (request, response, next) => {
  const { name, number } = request.body

  const person = new Person({
    name: name,
    number: number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' || error === 'docNotFound') {
    return response
      .status(400)
      .send(`Couldn't fetch the contact with the given ID, please fix your ID formatting or provide an ID that exists..`)
  } else if (error.name === 'ValidationError') {
    return response.status(401).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

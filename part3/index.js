const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
const baseUrl = '/api/persons'
app.use(morgan('tiny'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/info', (request, response) => {
  response.send(`
  <div>Phonebook has info for ${persons.length} people.</div> 
  <div>${new Date()}</div>`)
})

app.get('/', (request, response) => {
  response.send("<h1>What's up chump?</h1>")
})

app.get(baseUrl, (request, response) => {
  response.json(persons)
})

app.get(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).send("The person you're looking for is non-existent.")
  }
})

app.delete(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)
  console.log(persons)
  response.status(204).end()
})

// const generateId = () => {
//   const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0
//   return maxId + 1
// }

app.post(baseUrl, (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'information missing',
    })
  }

  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: Math.floor(Math.random() * 543634563563467567),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

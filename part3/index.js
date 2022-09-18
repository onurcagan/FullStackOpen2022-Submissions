const { json } = require('express')
const express = require('express')
const morgan = require('morgan')

const app = express()
const cors = require('cors')
const baseUrl = '/api/persons'

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let phonebook = [
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
morgan.token('content', (request) => request.method === 'POST' && request.body.name && JSON.stringify(request.body))

app.get('/info', (request, response) => {
  response.send(`
  <div>Phonebook has info for ${phonebook.length} people.</div> 
  <div>${new Date()}</div>`)
})

app.get('/', (request, response) => {
  app.use(morgan('tiny', { stream: console.log }))

  response.send("<h1>What's up chump?</h1>")
})

app.get(baseUrl, (request, response) => {
  response.json(phonebook)
})

app.get(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find((person) => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).send("The person you're looking for is non-existent.")
  }
})

app.delete(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter((person) => person.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0
  return maxId + 1
}

app.post(baseUrl, (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'information missing',
    })
  }

  if (phonebook.find((person) => person.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  phonebook = phonebook.concat(person)

  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

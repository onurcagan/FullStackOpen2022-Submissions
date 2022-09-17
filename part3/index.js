const express = require('express')
const app = express()
app.use(express.json())
const baseUrl = '/api/persons'

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

app.get('/', (request, response) => {
  response.send("<h1>What's up chump?</h1>")
})

app.get(baseUrl, (request, response) => {
  response.json(persons)
})

app.get(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).send("The note you're looking for is non-existent.")
  }
})

app.delete(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((note) => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0
  return maxId + 1
}

app.post(`${baseUrl}/:id`, (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(note)

  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

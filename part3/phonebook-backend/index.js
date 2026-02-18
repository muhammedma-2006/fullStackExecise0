const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')





app.use(express.json())

app.use(cors())

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  } 
  return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

const generateId = () => Math.floor(Math.random() * 1e9).toString()


app.get('/api/persons', (req, res) => {
  res.json(persons)
})


app.get('/info', (req, res) => {
  const count = persons.length
  const time = new Date()

  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${time}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)

  if (!person) {
    return res.status(404).json({ error: 'person not found' })
  }

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})


app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

 
  if (!name || !number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const nameExists = persons.some(p => p.name === name)

  if (nameExists) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: generateId(),
    name,
    number
  }

  persons.push(newPerson)

  res.status(201).json(newPerson)
})


app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

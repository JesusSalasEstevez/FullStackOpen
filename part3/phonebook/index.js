const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))

app.use(express.json())

morgan.token('person', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(morgan((tokens, request, response) => {
    return [
        tokens.method(request,response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.res(request, response, 'content-length'), '-',
        tokens['response-time'](request, response), 'ms',
        tokens.person(request, response)
    ].join('')
}))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1> Hello World </h1>')
})

app.get('/info', (request, response) => {
    const date = new Date()
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    response.send(info)
})

app.get('/api/persons', (request, response, next) => {
    Person.find({})
    .then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => response.json(person))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if(body.name === undefined || body.number === undefined){
        return response.status(400).json({error: 'parameters missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100)
    })

    person.save()
        .then(savedPerson => response.json(savedPerson))
        .catch(error => {
            next(error)
        })

})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name
    }

    Person.findByIdAndUpdate(request.params.id, body, {number: body.number, runValidators: true, context: 'query'})
    .then(updatedPerson => {response.json(updatedPerson)})
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) =>{
    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT | 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}/`)
})
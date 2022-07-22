require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

const morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))


const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

const Person = require('./models/person')



app.get('/api/persons', (request, response) => {
  // const p = Person.exists({"name":"ishaan"})
  // const p_list = Person.find({}).then(p => [p.name, p.number])
  // console.log()
  // p.then(pe => response.json(pe))
  Person.find({})
  .then(person => {
    response.json(person)
  })
  // response.json(persons)
})

// app.get('/api/info', (request, response) => {
//   const num = persons.length;
//   const date = new Date()
//   const val = `Phonebook has ${num} people. </br>${date}`;
//   response.send(val)
//   // response.json(persons)
// })


app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
  .then(person => {
    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  console.log(id)

  Person.findByIdAndRemove(id)
  .then(resp => {
    return response.json(resp)
  })
  .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({error:'name or number missing'})
  }

  const person = new Person ({
    name: body.name,
    number: body.number || false
  })

  person.save()
  .then(savedPerson => response.json(savedPerson))
  .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  if (!body.name || !body.number) return response.status(400).json({ error: 'name or number missing' });

  const person = new Person({
    _id: body.id,
    name: body.name,
    number: body.number
  })

  Person.findByIdAndUpdate(id, person, {new:true, runValidators:true})
  .then(newperson => response.json(newperson))
  .catch(error => next(error))

})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name == 'CastError'){
    return response.status(400).send({error: 'Malformatted id'})
  }
  if (error.name == 'ValidationError'){
    return response.status(400).send({error: error.message})
  }
  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

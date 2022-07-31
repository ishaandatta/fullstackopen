const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')



mongoose
    .connect(config.MONGODB_URI)
    .then(() => logger.info("Connected to MongoDB"))
    .catch((error) => logger.error('Error connecting to Mongo: ', error.message))

app.use(cors())
app.use(express.json())
// app.use(logger)

app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app
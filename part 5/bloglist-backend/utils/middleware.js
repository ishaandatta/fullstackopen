const morgan = require('morgan')
const { response } = require('../app')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')


const unknownEndpoint = (request, response, next) => {
    logger.info("Unkown Endpoint")
    response.status(404).send({error:"Unknown endpoint"})
}


const requestLogger = (request, response, next) => {

    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    // logger.info('---')
    next()
    
}


const errorHandler = (error, request, response, next) => {

    if (error.name === "CastError") {
        response.status(404).send({error:"Malformatted id"})
    }
    if(error.name === "ValidationError"){
        response.status(400).json({error:error.message})
    }
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
        error: 'invalid token'
        })
    }
  logger.error(error.message)
    next(error)
}


const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    } else {
        request.token = null
    }
    next()
}


const userExtractor = async(request, response, next) => {
    const token = request.token
    if (token==null) return response.status(401).json({error: 'token missing'})

    let decodedToken
    try { 
        decodedToken = await jwt.verify(token, process.env.SECRET)
        console.log("TOKEN:", decodedToken)
    } catch(except) {
        console.log("TOKEN:", decodedToken)
        if ((!decodedToken) || (!decodedToken.id)) response.status(401).json({error: 'token invalid'})
        next(except)
    }

    if (decodedToken.id) {
        request.user = await User.findById(decodedToken.id)
        // console.log(decodedToken.id)
    }
    next()
}


module.exports = {unknownEndpoint, requestLogger, errorHandler, tokenExtractor, userExtractor}
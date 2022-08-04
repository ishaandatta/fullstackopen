// User Router
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')



userRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs')
    response.status(200).json(users)
})


userRouter.post('/', async(request, response, next) => {

    const { username, name, password } = request.body
    let passwordHash
    try {
        const saltRounds = 10
        passwordHash = await bcrypt.hash(password, saltRounds)
    } catch(exception) {
        next(exception)
    }
    const user = new User({
        username,
        name,
        passwordHash
    })

    try {
        const res = await user.save()
        response.status(201).json(res)
    } catch (exception) {
        next(exception)
    }
})


userRouter.delete('/:id', async(request, response, next) => {

    const id = request.params.id

    try {
        const deletedUser = await User.findByIdAndRemove(id)
        response.status(200).json(deletedUser)
    }   catch(exception) {
        next(exception)
    }
})

module.exports = userRouter
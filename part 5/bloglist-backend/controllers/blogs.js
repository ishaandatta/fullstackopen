// Router file
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', {"blogs":0, "id":0, "name":0})
    response.json(blogs)
    // Promise based: Blog.find({}).then(blogs => response.json(blogs))
})

blogsRouter.post('/', middleware.userExtractor, async(request, response, next) => {

    let blog = request.body
    blog.user = request.user.id
    blog = new Blog(blog)

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
        request.user.blogs = request.user.blogs.concat(savedBlog.id)
        await request.user.save()
    }   catch(exception) {
        next(exception)
    }
})
  

blogsRouter.delete('/:id', middleware.userExtractor, async(request, response, next) => {

    const id = request.params.id
    let blog = await Blog.findById(id)
    let user = request.user

    try {
        if (blog.user.toString() === user.id.toString()) {
            const indx = user.blogs.indexOf(id)
            const deletedBlog = await Blog.findByIdAndRemove(id)
            let tmp = user.blogs
            tmp.splice(indx, 1)
            user.blogs = tmp
            tmp = await user.save()
            response.status(200).json(tmp)
        }
        else{
            response.status(401).json({error:"User can't delete this blog post"})
        }
        }   catch(exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', middleware.userExtractor, async(request, response, next) => {
    const id = request.params.id
    const blog = request.body
    blog.user = request.user.id

    try{
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {runValidators:true, new:true})
        return response.status(200).json(updatedBlog)
    }   catch(exception) {
        next(exception)
    }
    // Blog
    //     .findByIdAndUpdate(id, blog, {runValidators:true, new:true})
    //     .then(result => {
    //     response.status(200).json(result)
    //     })
    //     .catch(error => next(error))
})


module.exports = blogsRouter
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user')
  response.status(200).json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(blog.user.toString() === decodedToken.id.toString()){
    await Blog.findByIdAndDelete(blog.id)
  }

  response.status(204).end()
})

blogsRouter.put('/:id', async(request, response, next) => {
  const body = request.body
  await Blog.findByIdAndUpdate(request.params.id, body)
  response.status(200).json(body)
})
  
module.exports = blogsRouter
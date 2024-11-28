const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user')
  response.status(200).json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const users = await User.find({})

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: users[0].id
  })

  const savedBlog = await blog.save()
  users[0].blogs = users[0].blogs.concat(savedBlog._id)
  await users[0].save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async(request, response, next) => {
  const body = request.body
  const updated = await Blog.findByIdAndUpdate(request.params.id, body)
  response.status(200).json(updated)
})
  
  module.exports = blogsRouter
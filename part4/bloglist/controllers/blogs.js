const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
  
  module.exports = blogsRouter
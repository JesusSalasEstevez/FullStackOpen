const {test, after, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('node:assert')

const api = supertest(app)

const initialBlogs = [
    {
        title: "Wikipedia",
        author: "Wiki",
        url: "https://wikipedia.com",
        likes: 10
    },
    {
        title: "Amazon",
        author: "Ama",
        url: "https://amazon.com",
        likes: 14
    },

]

beforeEach(async () => {
    await Blog.deleteMany({})
    for(let blog of initialBlogs){
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('correct number of blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('identifier is id', async () => {
    const response = await api.get('/api/blogs')

    if(response.body.length > 0){
        const blog = response.body[0]
        assert.strictEqual('id' in blog, true)
    }
})

test('post test to blogs', async () => {

    const blog = {
        title: "Localhost",
        author: "me",
        url: "http://localhost:303",
        likes: 100000
    }

    const send = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const request = await api.get('/api/blogs')

    const newBlog = send._body

    assert.strictEqual(request.body.length, initialBlogs.length+1)
    assert.deepStrictEqual(request.body[request.body.length - 1], newBlog)

})

after(async () => {
    await mongoose.connection.close()
})



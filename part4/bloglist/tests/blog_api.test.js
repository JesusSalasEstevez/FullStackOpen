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


after(async () => {
    await mongoose.connection.close()
})



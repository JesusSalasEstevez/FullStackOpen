const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('favouriteBlog return wikipedia', () => {
    const wikipedia = {
        name: 'wikipedia',
        author: 'anto',
        link: 'https://wikipedia.com',
        likes: 10
    }
    const personal = {
        name: 'personal',
        author: 'me',
        link: 'http://localhost',
        likes: 5
    }
    const blogs = [wikipedia, personal]

    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, wikipedia)
})
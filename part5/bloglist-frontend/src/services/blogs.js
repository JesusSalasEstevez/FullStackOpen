import axios from 'axios'
const baseUrl = '/api/blogs'
let token

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers : {Authorization: token}
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const newLike = async blog => {
  console.log(blog.user.id)
  const newBlog = {...blog, likes: blog.likes + 1, user:blog.user.id}
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog)
  return response.data
}

export default { getAll, create, setToken, newLike }
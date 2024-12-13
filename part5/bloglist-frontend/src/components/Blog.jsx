import {useState} from 'react'
import blogService from '../services/blogs'

const Remove = ({handleRemove}) => {
    return(
      <button onClick={handleRemove}>remove</button>
    )
}

const Blog = ({blog, user}) => {
  const [visible, setVisibility] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)

  const hideWhenVisible = {display : visible ? 'none' : ''}
  const showWhenVisible = {display : visible ? '' : 'none'}

  const handleVisibility = () => setVisibility(!visible)

  const handleRemove = async () => {
    if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.user.name}`)){
      await blogService.erase(blog)
      setBlogs(blogs.delete(blog))
    }
  }
  const handleLike = async () => {
    const newBlog = {...blogObject, likes : blogObject.likes + 1}
    await blogService.newLike(newBlog)
    setBlogObject(newBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blogObject.title}
      <button onClick={handleVisibility}>view</button>
    </div>
    <div style={showWhenVisible}>
      {blogObject.title} {blogObject.author}<button onClick={handleVisibility}>hide</button><br/>
      {blogObject.url}<br/>
      {blogObject.likes}<button onClick={handleLike}>like</button><br/>
      {blogObject.author}<br/>
      <Remove handleRemove={handleRemove}/>
    </div>
  </div> 
  )
}

export default Blog
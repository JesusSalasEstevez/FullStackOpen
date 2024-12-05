import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisibility] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)

  const hideWhenVisible = {display : visible ? 'none' : ''}
  const showWhenVisible = {display : visible ? '' : 'none'}

  const handleVisibility = () => setVisibility(!visible)
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
      {blogObject.user.name}
    </div>
  </div> 
  )
}

export default Blog
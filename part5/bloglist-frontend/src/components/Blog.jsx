import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisibility] = useState(false)
  const [blog_, setBlog] = useState(blog)

  const hideWhenVisible = {display : visible ? 'none' : ''}
  const showWhenVisible = {display : visible ? '' : 'none'}

  const handleVisibility = () => setVisibility(!visible)
  const handleLike = async () => {
    const response = await blogService.newLike(blog_)
    setBlog(response)
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
      {blog_.title}
      <button onClick={handleVisibility}>view</button>
    </div>
    <div style={showWhenVisible}>
      {blog_.title} {blog_.author}<button onClick={handleVisibility}>hide</button><br/>
      {blog_.url}<br/>
      {blog_.likes}<button onClick={handleLike}>like</button><br/>
      {blog_.user.name}
    </div>
  </div> 
  )
}

export default Blog
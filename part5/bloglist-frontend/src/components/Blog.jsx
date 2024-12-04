import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisibility] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = {display : visible ? 'none' : ''}
  const showWhenVisible = {display : visible ? '' : 'none'}

  const handleVisibility = () => setVisibility(!visible)
  const handleLike = async () => {
    try{
      await blogService.newLike(blog)
    }catch{
      console.log('error')
    }
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
      {blog.title}
      <button onClick={handleVisibility}>view</button>
    </div>
    <div style={showWhenVisible}>
      {blog.title}<button onClick={handleVisibility}>hide</button><br/>
      {blog.url}<br/>
      {likes}<button onClick={handleLike}>like</button><br/>
      {blog.author}
    </div>
  </div> 
  )
}

export default Blog
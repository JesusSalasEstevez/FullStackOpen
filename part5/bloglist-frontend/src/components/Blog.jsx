import {useState} from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisibility] = useState(false)

  const hideWhenVisible = {display : visible ? 'none' : ''}
  const showWhenVisible = {display : visible ? '' : 'none'}

  const handleVisibility = () => setVisibility(!visible)

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
      {blog.likes}<br/><button>like</button>
      {blog.author}
    </div>
  </div> 
  )
}

export default Blog
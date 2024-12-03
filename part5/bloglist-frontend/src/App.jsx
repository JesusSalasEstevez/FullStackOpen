import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const ErrorMessage = ({message}) => {
  const messageStyle = {
    color: 'red',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'lightgrey',
    margin: 10
  }

  if(message === null)
    return null

  return (
    <div style={messageStyle}>
      <p>
        {message}
      </p>
    </div>
  )
}

const Message = ({message}) => {
  const messageStyle = {
    color: 'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'lightgrey',
    margin: 10
  }
  if(message === null)
    return null

  return (
    <div style={messageStyle}>
      <p>
        {message}
      </p>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch{
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const createBlog = async () => {
    event.preventDefault()
    try{
      await blogService.create({title, author, url})
      setMessage(`a new blog ${title} by ${author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }catch(exception){
      setErrorMessage('Create Failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => {
    const hidenWhenVisible = {display : blogFormVisible ? 'none' : ''}
    const showWhenVisible = {display : blogFormVisible ? '' : 'none'}
    return (
      <div>
        <div style = {hidenWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create new</button>
        </div>
        <div style = {showWhenVisible}>
          <BlogForm createBlog={createBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  /*{user === null
  ? Blogs(user, blogs)
  : LoginForm(username, setUsername, password, setPassword, handleLogin)
  }*/

  const hidenWhenVisible = {display : blogFormVisible ? 'none' : ''}
  const showWhenVisible = {display : blogFormVisible ? '' : 'none'}
  if(user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorMessage message= {errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            username 
            <input
              type = "text"
              value = {username}
              name = "Username"
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type = "text"
              value = {password}
              name = "Password"
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }else{
    return (
      <div>
        <h2>blogs</h2>
        <Message message= {message}/>
        <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
        <div>
          <div style = {hidenWhenVisible}>
            <button onClick={() => setBlogFormVisible(true)}>create new</button>
          </div>
          <div style = {showWhenVisible}>
            <BlogForm createBlog={createBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>
            <button onClick={() => setBlogFormVisible(false)}>cancel</button>
          </div>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const LoginForm = (username, setUsername, password, setPassword, handleLogin) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type = "text"
            value = {username}
            name = "Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
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
}

const Blogs = (user, blogs) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)
      console.log()
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      console.log('error en el login', exception)
    }
  }

  const createBlog = async (newBLog) => {
    event.preventDefault()
    await blogService.create({title, author, url})
  }

  /*{user === null
  ? Blogs(user, blogs)
  : LoginForm(username, setUsername, password, setPassword, handleLogin)
  }*/

  if(user === null){
    return (
      <div>
        <h2>Log in to application</h2>
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
        <p>{user.username} logged in</p>
        <h2>create new</h2>
        <form onSubmit={createBlog}>
          <div>
            title:
            <input
              type = "text"
              valute = {title}
              name = "Title"
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type = "text"
              valute = {author}
              name = "Author"
              onChange={({target}) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type = "text"
              valute = {url}
              name = "Url"
              onChange={({target}) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App
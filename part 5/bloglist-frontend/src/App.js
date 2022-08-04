import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import CreateForm from './components/Create'
import Toggalable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)
  const blogFormRef = useRef(null)


  const fetchBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }
  useEffect(() => {
    fetchBlogs()
  }, [JSON.stringify(blogs)])

  useEffect(() => {

    const loggenInUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggenInUserJSON){
      const user = JSON.parse(loggenInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async(event) => {
    event.preventDefault()
    console.log(username, password)
    try {
      const usr = await blogService.login({ username, password })
      setUser(usr)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(usr)
      )
      blogService.setToken(usr.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const logout = (event) => {
    event.preventDefault()
    console.log(`Logging out ${user}`)
    setUser(null)
    return window.localStorage.removeItem('loggedBlogappUser')
  }


  const loginForm = () => {
    return (
      <div>
        <Toggalable buttonLabel="Login">
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
              Username
            <div>
              <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
            </div>
              Password
            <div>
              <input type="text" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
            </div>
            <button type="submit">login</button>
          </form>
        </Toggalable>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div id="mainPage">
        <h2>blogs</h2>
        {user.name} logged in <br></br>
        <button type="button" onClick={logout}>Logout</button>
        <br></br><br></br>

        <Toggalable buttonLabel="create" refs={blogFormRef}>
          <CreateForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setErrorMessage={setErrorMessage} fetchBlogs={fetchBlogs}/>
        </Toggalable>
        <br></br><br></br>

        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} username={user.username} fetchBlogs={fetchBlogs}/>
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} message={message} />

      { user === null ? loginForm() : blogForm() }

    </div>
  )


}

export default App

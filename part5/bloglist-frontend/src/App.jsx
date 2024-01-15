import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    setNotificationMessage(`Added blog '${returnedBlog.title}' by ${returnedBlog.author}`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000);
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const responseData = await loginService.login({
        username, password
      })

      console.log(`response from login: ${responseData}`)
      blogService.setToken(responseData.token)
      window.localStorage.setItem('loggeduser', JSON.stringify(responseData))
      setUserData(responseData)
      setUsername(responseData.username)
      setPassword('')
    }
    catch (exception) {
      console.log(`Login failed: ${exception}`)
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUserData(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggeduser')
  }

  if (userData === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <p style={{color: 'red'}}>{errorMessage}</p>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <p>Logged in as {username}</p>
      <button onClick={handleLogout}>Logout</button>

      <p style={{color: 'red'}}>{errorMessage}</p>
      <p style={{color: 'green'}}>{notificationMessage}</p>

      <h3>New Blog</h3>
      <form onSubmit={addBlog}>
        <div>
          Title 
          <input
            type='text'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          Author 
          <input
            type='text'
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
        </div>
        <div>
          Url 
          <input
            type='text'
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
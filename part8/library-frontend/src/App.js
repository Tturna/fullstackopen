import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommended from './components/Recommended'
import NewBook from './components/NewBook'
import Login from './components/Login'

import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = window.localStorage.getItem('libraryLoggedUser')

    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const d = data.data
      window.alert(`'${d.bookAdded.title}' by ${d.bookAdded.author.name} was added`)
    }
  })

  const handleLogout = () => {
    setToken(null)
    window.localStorage.removeItem('libraryLoggedUser')
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('recommended')}>recommended</button> : null}
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={handleLogout}>logout</button> : null}
        {token ? null : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <Recommended show={page === 'recommended'} />
      <NewBook show={page === 'add'} />
      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App

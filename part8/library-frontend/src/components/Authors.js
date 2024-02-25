import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [nameInput, setNameInput] = useState('')
  const [bornInput, setBornInput] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) return <div>Loading...</div>

  const authors = result.data.allAuthors

  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: nameInput, setBornTo: Number(bornInput) }})
    setNameInput('')
    setBornInput('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
          <div>
            name
            <input value={nameInput} onChange={event => setNameInput(event.target.value)} />
          </div>
          <div>
            born
            <input value={bornInput} onChange={event => setBornInput(event.target.value)} />
          </div>
          <button>Update author</button>
      </form>
    </div>
  )
}

export default Authors

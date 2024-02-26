import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [bornInput, setBornInput] = useState('')
  const [authorSelect, setAuthorSelect] = useState('')
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
    editAuthor({ variables: { name: authorSelect, setBornTo: Number(bornInput) }})
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
          <select onChange={e => setAuthorSelect(e.target.value)}>
            {authors.map(a => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
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

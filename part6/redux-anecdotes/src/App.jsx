import { useSelector, useDispatch } from 'react-redux'
import { voteOn, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteOn(id))
  }

  const create = (event) => {
    event.preventDefault()
    console.log('create', event)
    const text = event.target.anecdoteText.value
    dispatch(createAnecdote(text))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input type='text' name='anecdoteText' placeholder='New anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
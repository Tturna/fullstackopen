import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const text = event.target.anecdoteText.value
        dispatch(createAnecdote(text))
    }

    return(
      <form onSubmit={create}>
        <div><input type='text' name='anecdoteText' placeholder='New anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    )
}

export default AnecdoteForm
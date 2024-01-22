import { useDispatch } from "react-redux"
import { appendAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const text = event.target.anecdoteText.value
        const newAnecdote = await anecdoteService.create(text)

        dispatch(appendAnecdote(newAnecdote))
        dispatch(changeNotification(`You created '${text}'`))
        setTimeout(() => {
            dispatch(changeNotification(''))
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input type='text' name='anecdoteText' placeholder='New anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
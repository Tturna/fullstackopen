import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notify } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const text = event.target.anecdoteText.value
        dispatch(createAnecdote(text))
        dispatch(notify(`You created '${text}'`, 5000))
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
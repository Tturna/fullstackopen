import { useSelector, useDispatch } from "react-redux";
import { voteOn } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filter = state.filter
        const stored = state.anecdotes
        const filtered = stored.filter(n => filter === '' || n.content.toLowerCase().includes(filter))
        const sorted = filtered.sort((a, b) => b.votes - a.votes)
        return sorted
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        const text = anecdotes.find(n => n.id === id).content

        dispatch(voteOn(id))
        dispatch(notify(`You voted '${text}'`, 5000))
    }

    return(
        <div>
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
        </div>
    )
}

export default AnecdoteList
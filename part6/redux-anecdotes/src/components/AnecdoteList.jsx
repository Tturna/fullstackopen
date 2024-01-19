import { useSelector, useDispatch } from "react-redux";
import { voteOn } from "../reducers/anecdoteReducer";

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
        console.log('vote', id)
        dispatch(voteOn(id))
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
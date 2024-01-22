import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

export const getAnecdotes = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const createAnecdote = async (content) => {
    const created = {
        content,
        id: getId(),
        votes: 0
    }

    const res = await axios.post(baseUrl, created)
    return res.data
}

export const updateAnecdote = async (newAnecdote) => {
    const res = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
    return res.data
}
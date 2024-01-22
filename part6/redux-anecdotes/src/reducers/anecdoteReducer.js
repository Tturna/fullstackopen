import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]


// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   state.push(asObject(action.payload))
    // },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    // voteOn(state, action) {
    //   const id = action.payload
    //   // console.log(JSON.parse(JSON.stringify(state)))
    //   const toUpdate = state.find(n => n.id === id)
    //   const updated = {
    //     ...toUpdate,
    //     votes: toUpdate.votes + 1
    //   }
      
    //   return state.map(n => n.id === id ? updated : n)
    // }
  }
})

export const { /* createAnecdote,*/ appendAnecdote, setAnecdotes/*, voteOn */ } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch(setAnecdotes(data))
  }
}

export const createAnecdote = (text) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(text)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteOn = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const toUpdate = anecdotes.find(n => n.id === id)
    const voteIncremented = {...toUpdate, votes: toUpdate.votes + 1 }
    const updated = await anecdoteService.update(id, voteIncremented)
    dispatch(setAnecdotes(anecdotes.map(n => n.id === id ? updated : n)))
  }
}

export default anecdoteSlice.reducer
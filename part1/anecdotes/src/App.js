import { useState } from "react"

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initVotes = new Array(anecdotes.length).fill(0)
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initVotes)
  const [mostVotedIndex, setMostVotedIndex] = useState(0)

  function setRandomAnecdoteIndex() {
    const idx = Math.round(Math.random() * (anecdotes.length - 1))
    setSelected(idx)
  }

  function setMostVoted(voteArray) {
    const max = Math.max(...voteArray)
    const maxIndex = voteArray.indexOf(max)
    setMostVotedIndex(maxIndex)
  }

  function addVote(index) {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
    setMostVoted(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br />
      has {votes[selected]} votes <br />
      <button onClick={() => addVote(selected)}>Vote</button>
      <button onClick={() => setRandomAnecdoteIndex()}>Random Anecdote</button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotedIndex]} <br />
      has {votes[mostVotedIndex]} votes <br />
    </div>
  )
}

export default App
import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Vote = ({ voteCount }) => {
  return <p>This anecdote has {voteCount} votes.</p>
}

const MostVotedAnecdote = ({ votes, anecdotes }) => {
  if (votes.every((i) => i === 0)) return

  const max = Math.max(...votes)
  const index = votes.indexOf(max)

  return <p>{anecdotes[index]}</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ]

  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState(Array(anecdotes.length).fill(0))

  const setToVoteCount = () => () => {
    const updatedVotes = [...voteCount]
    updatedVotes[selected] += 1
    setVoteCount(updatedVotes)
  }

  return (
    <>
      <h1> Anecdote of the day </h1>
      <div>{anecdotes[selected]}</div>
      <Vote voteCount={voteCount[selected]} />

      <Button handleClick={setToVoteCount()} text="vote" />
      <Button
        handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}
        text="next anecdote"
        anecdotes={anecdotes}
      />
      <h1> Anecdote with most votes</h1>
      <MostVotedAnecdote votes={voteCount} anecdotes={anecdotes} />
    </>
  )
}

export default App

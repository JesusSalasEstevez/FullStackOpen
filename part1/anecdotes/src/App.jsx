import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

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

  const nextAnecdote = () => {
    const index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
    setVotes(points[index])
  }

  const votePositive = () => {
    const new_points = [...points]
    new_points[selected] += 1
    setVotes(new_points[selected])
    setPoints(new_points)
    setMostVoted(new_points.indexOf(Math.max(...new_points)))
}
  
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [most_voted, setMostVoted] = useState(0)

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes} votes</p>
      <Button text={'vote'} handleClick={votePositive} />
      <Button text={'next anecdote'} handleClick={nextAnecdote} />
      <p>Anecdote with most votes</p>
      <p>{anecdotes[most_voted]}</p>
      <p>has {points[most_voted]} votes</p>
    </div>
  )
}

export default App
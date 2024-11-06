import { useState } from 'react'
const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, votes}) => {
  if(text == 'positive')
    return(
      <tr><td>{text}</td><td>{votes}%</td></tr>
    )
  else
    return(
      <tr><td>{text}</td><td>{votes}</td></tr>
    )
}

const Statics = ({good, bad, neutral}) => {
  const all = good + bad + neutral
  const average = (good - bad)/all
  const positive = good / all*100
  if(all == 0)
    return(
      <p>No feedback given</p>
    )
  else
    return(
      <table>
        <tbody>
          <StatisticLine text={'good'} votes={good} />
          <StatisticLine text={'neutral'} votes={neutral} />
          <StatisticLine text={'bad'} votes={bad} />
          <StatisticLine text={'all'} votes={all} />
          <StatisticLine text={'average'} votes={average} />
          <StatisticLine text={'positive'} votes={positive} />
        </tbody>
      </table>
    )
}



const App = () => {
  const voteGood = () => {
    const vote = good + 1
    setGood(vote)
  }
  
  const voteNeutral = () =>{
    const vote = neutral + 1
    setNeutral(vote)
  }

  const voteBad = () => {
    const vote = bad + 1
    setBad(vote)
  }
  
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = bad + neutral + good

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} handleClick={voteGood}/>
      <Button text={'neutral'} handleClick={voteNeutral} />
      <Button text={'bad'} handleClick={voteBad} />
      <h1>statistics</h1>
      <Statics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
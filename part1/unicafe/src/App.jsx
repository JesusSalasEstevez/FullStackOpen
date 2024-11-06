import { useState } from 'react'
const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Result = ({text, votes}) => <p>{text} {votes}</p>



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
      <Result text={'good'} votes={good} />
      <Result text={'neutral'} votes={neutral} />
      <Result text={'bad'} votes={bad} />
      <p>all {all}</p>
      <p>average {(good-bad)/all}</p>
      <p>positive {good/all*100}%</p>
    </div>
  )
}

export default App
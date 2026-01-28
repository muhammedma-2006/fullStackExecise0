import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  
  )
}
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleForGood = () => {  
    setGood(good + 1)
    setAll(all + 1)
    setAverage((good + 1 - bad) / (all + 1))
    setPositive(((good + 1) / (all + 1)) * 100)
  }

  const handleForNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((good - bad) / (all + 1))
    setPositive((good / (all + 1)) * 100)
  }

  const handleForBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((good - (bad + 1)) / (all + 1))
    setPositive((good / (all + 1)) * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleForGood} text="good" />
      <Button handleClick={handleForNeutral} text="neutral" />
      <Button handleClick={handleForBad} text="bad" />
      <h1>statistics</h1>
      {(all === 0) ? (
        <p>No feedback given</p>
      ) : (   
    <div>   
      <table>
        
      
      <StatisticLine text="good " value={good} />
      <StatisticLine text="neutral " value={neutral} />
      <StatisticLine text="bad " value={bad} />
      <StatisticLine text="all " value={all} />
      <StatisticLine text="average " value={average.toFixed(2)} />
      <StatisticLine text="positive " value={positive.toFixed(2) + " %"} />
      </table>
    </div>
      )}
    </div>
  )
}

export default App
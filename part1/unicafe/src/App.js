import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, totalEntries, totalScore}) => {
  if (totalEntries > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text={"Good"} value={good} />
          <StatisticLine text={"Neutral"} value={neutral} />
          <StatisticLine text={"Bad"} value={bad} />
          <StatisticLine text={"Total Entries"} value={totalEntries} />
          <StatisticLine text={"Average Score"} value={totalScore / totalEntries} />
          <StatisticLine text={"Positive %"} value={(good / totalEntries * 100) + "%"} />
        </tbody>
      </table>
    )
  }
  else {
    return (
      <div>
        <p>
          No feedback given.
        </p>
      </div>
    )
  }
}

const Button = ({eventHandler, text}) => {
  return (
    <>
      <button onClick={eventHandler}>{text}</button>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalScore, setTotalScore] = useState(0)

  const setValue = (setter, newValue, score) => {
    setter(newValue)
    setTotalScore(totalScore + score)
  }

  var totalEntries = good + neutral + bad
  
  return (
    <div>
      <h1>Give Feedback</h1>
      
      <div>
        <Button eventHandler={() => setValue(setGood, good + 1, 1)} text={"Good"} />
        <Button eventHandler={() => setValue(setNeutral, neutral + 1, 0)} text={"Neutral"} />
        <Button eventHandler={() => setValue(setBad, bad + 1, -1)} text={"Bad"} />
      </div>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} totalEntries={totalEntries} totalScore={totalScore} />
    </div>
  );
}

export default App;

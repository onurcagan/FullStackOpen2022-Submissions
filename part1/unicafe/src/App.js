import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const Total = ({ feedbackCount: [good, neutral, bad] }) => {
  const total = good + neutral + bad
  return (
    <>
      <br />
      <p>Total number of Feedbacks is - {total}</p>
    </>
  )
}

const Average = ({ feedbackCount: [good, neutral, bad] }) => {
  const [goodScore, neutralScore, badScore] = [1, 0, -1]
  const totalFeedbackCount = good + neutral + bad
  const average = (goodScore * good + neutralScore * neutral + badScore * bad) / totalFeedbackCount
  return (
    <>
      <p>The average score is {average}</p>
    </>
  )
}

const Positive = ({ feedbackCount: [good, neutral, bad] }) => {
  const totalFeedbackCount = good + neutral + bad
  const positivePercentage = (good / totalFeedbackCount) * 100
  return (
    <>
      <p>The average score is {positivePercentage}%</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (newGoodValue, newNeutralValue, newBadValue) => () => {
    if (good !== newGoodValue) {
      setGood(newGoodValue)
    }

    if (neutral !== newNeutralValue) {
      setNeutral(newNeutralValue)
    }

    if (bad !== newBadValue) {
      setBad(newBadValue)
    }
  }

  return (
    <div>
      <h1>
        <strong> Give Feedback </strong>
      </h1>
      <Button onClick={setToValue(good + 1, neutral, bad)} text="good" />
      <Button onClick={setToValue(good, neutral + 1, bad)} text="neutral" />
      <Button onClick={setToValue(good, neutral, bad + 1)} text="bad" />
      <br />

      <h1>
        <strong>Statistics</strong>
      </h1>
      <p>Good Feedback amount is - {good}</p>
      <br />
      <p>Neutral Feedback amount is - {neutral}</p>
      <br />
      <p>Bad Feedback amount is - {bad}</p>

      <Total feedbackCount={[good, neutral, bad]} />

      <Average feedbackCount={[good, neutral, bad]} />

      <Positive feedbackCount={[good, neutral, bad]} />
    </div>
  )
}

export default App

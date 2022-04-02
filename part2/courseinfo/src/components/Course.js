import React from 'react'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = ({ part }) => (
  <>
    {part.name} {part.exercises}
    <br />
    <br />
  </>
)

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  )
}

const Total = ({ total }) => <strong>Number of exercises {total}</strong>

const Course = ({ course }) => {
  const { id, name, parts } = course
  const total = parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)
  return (
    <>
      <Header course={name} />
      <Content parts={parts} id={id} />
      <Total total={total} />
    </>
  )
}

export default Course

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = ({ part, id }) => (
  <p key={id}>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts, id }) => {
  return (
    <>
      <Part part={parts[0]} id={id} />
      <Part part={parts[1]} id={id} />
      <Part part={parts[2]} id={id} />
    </>
  )
}

const Course = ({ course }) => {
  const { id, name, parts } = course
  return (
    <>
      <Header course={name} />
      <Content parts={parts} id={id} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  }

  return <Course course={course} />
}

export default App

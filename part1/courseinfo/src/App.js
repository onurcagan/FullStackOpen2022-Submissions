const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.exercise.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0]} exercise={props.exercises[0]} />
      <Part part={props.part[1]} exercise={props.exercises[1]} />
      <Part part={props.part[2]} exercise={props.exercises[2]} />
    </div>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header name={course.name} />
      <Content part={course.parts} exercises={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}

export default App

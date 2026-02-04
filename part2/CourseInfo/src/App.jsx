const Header = ({course}) => {
  return <h1>{course.name}</h1>
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
      
    </p>
  )
}

const Content = ({part}) => {
  return (
    <div>
      <Part name={part[0].name} exercises={part[0].exercises} />
      <Part name={part[1].name} exercises={part[1].exercises} />
      <Part name={part[2].name} exercises={part[2].exercises} />
      <Part name={part[3].name} exercises={part[3].exercises} />
    </div>
  )
}

const Total = ({part}) => {
  const total = part.reduce((sum, exercise) => sum + exercise.exercises, 0)
  return (
    <h3>total of {total} exercises</h3>
  )
}
const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content 
        part={course.part} 
        />
      <Total 
        part={course.part} 
        />  
        
    </div>)}

const App = () => {
  const course ={
  name: 'Half Stack application development',
  part : [{
    name : 'Fundamentals of React',
    exercises: 10
  },
  {
    name : 'Using props to pass data',
    exercises: 7
  },   
  {
    name : 'State of a component',
    exercises: 14
  },
  {
    name : 'Redux',
    exercises: 11
  }]
  };
  return (
    
    <Course course={course} />
  )   
     
}

export default App;
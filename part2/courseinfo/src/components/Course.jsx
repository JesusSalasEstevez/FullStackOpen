const Header = ({header}) => {
    return(
      <h1>{header}</h1>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Content = ({parts}) => {
    const total = parts.reduce((s, part) => s += part.exercises, 0)
    return(
      <>
        {parts.map(part => <Part key={part.id} part={part}/>)}
        <p>total of {total} exercises</p>
      </>
    )
  }
  
  const Course = ({course}) =>{
    return (
      <>
        <Header header={course.name} />
        <Content parts={course.parts} />
      </>
    )
  }

export default Course
let Header = (vals) =>{
  
  return (
    <h1>{vals.course} </h1>
  );
}

let Content = (vals) =>{

  return (
    <div>
      <Part part={vals.part1} exercises={vals.exercises1} />
      <Part part={vals.part2} exercises={vals.exercises2} />
      <Part part={vals.part3} exercises={vals.exercises3} />
    </div>
  );
}

let Part = (vals) => {

  return (
    <p> {vals.part} {vals.exercises} </p>
  );
}

let Total = (vals) => {

  return(
    <p>Number of exercises {vals.exercises1 + vals.exercises2 + vals.exercises3} </p>
  );

}

function App() {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises2={exercises2} exercises1={exercises1} exercises3={exercises3}/>
      {/* <h1>{course}</h1> */}
      {/* <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p> */}
      {/* <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
    </div>
  );

}

export default App;

let Header = (vals) =>{
  return (
    <h1>{vals.course.name} </h1>
  );
}

let Part = vals => {
  return (
    <p> {vals.parts.name} {vals.parts.exercises} </p>
  );
}

let Content = (vals) =>{
  // console.log(vals.parts[1]);
  return (
    <div>
      <Part parts={vals.parts[0]}  />
      <Part parts={vals.parts[1]}  />
      <Part parts={vals.parts[2]}  />
    </div>
  );
}

let Total = (vals) => {
  // console.log(vals.parts[0]);
  return(
    <p>Number of exercises {vals.parts[0].exercises + vals.parts[1].exercises + vals.parts[2].exercises} </p>
  );
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [ { name: 'Fundamentals of React',exercises: 10 },
              { name: 'Using props to pass data', exercises: 7 },
              { name: 'State of a component', exercises: 14 } ]
  }
    
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;

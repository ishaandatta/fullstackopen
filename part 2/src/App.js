import Course from './Course';


// const Course = ({courses}) => {
//     let x = 0;
//     return (
//         <div>
//             <h1>{course.name}</h1>
//             <ul>
//                 {course.parts.map(part => <li key={part.id}> {part.name} {part.exercises} </li>)}
//             </ul>
//             <b>total of {course.parts
//                                 .reduce((sum,part) => sum+part.exercises, 0)} exercises</b>
//             {/* <b>total of {course.parts
//                                 .map(part => part.exercises)
//                                 .reduce((sum,cur) => sum+cur, 0)} exercises</b> */}


//         </div>
//     );
// }

            


const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]
  
    // return <Course courses={courses} />
    return (
        <div>
            <h1>Web development curriculum </h1>
            <Course courses={courses}/>
        </div>
    );
  }

  export default App;

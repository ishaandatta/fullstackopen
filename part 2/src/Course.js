const Course = ({courses}) => {
    let x = 0;
    return (
        courses.map(course => {
            return(
                <div>
                <h2>{course.name}</h2>
                <ul>
                    {course.parts.map(part => <li key={part.id}> {part.name} {part.exercises} </li>)}
                </ul>
                <b>total of {course.parts
                    .reduce((sum,part) => sum+part.exercises, 0)} exercises</b>
                </div>
            );

        }));
    }

export default Course;

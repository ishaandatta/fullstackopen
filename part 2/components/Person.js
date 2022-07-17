const Person = ({person, removePerson}) => {
    return (
        <div>
            {<li> {person.name} {person.number} </li>}
            <button onClick={() => removePerson(person.name,person.id)}>Delete</button>
        </div>
    )

}


export default Person;

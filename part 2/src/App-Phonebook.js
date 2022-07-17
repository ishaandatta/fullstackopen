import { useEffect, useState } from 'react'
import Person from './components/Person'
import personService from './services/persons'
import './index.css'


const Message = ({message}) => {

  if (message==null) return null;

  return (
    <div className='message'>
      {message}
    </div>
  );
}

const ErrorMessage = ({error}) => {

  if (error==null) return null;

  return (
    <div className='error'>
      {error}
    </div>
  );
}

const Filter = ({newFilter, setNewFilter}) => {

    const handleFilterChange = (event) => setNewFilter(event.target.value);
    
    return (
        <div>
            <form>
            filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
            </form>
        </div> 
    );
}

const AddName = ({newName, newNum, setNewName, setNewNum, persons, setPersons, updatePerson}) => {
    const handleChange = (event) => {
        setNewName(event.target.value);
    }
    const handleNumChange = (event) => {
        setNewNum(event.target.value);
    }

    const addName = (event) => {
        event.preventDefault();
        if (persons.some(person => person.name === newName)) {
          updatePerson(newName, newNum);
        }
        else{
          const newPersonObject = {name:newName, number:newNum, id:persons.length+1};

          personService
          .create(newPersonObject)
          .then(responeData => {
            setPersons(persons.concat(responeData));
            setNewName('');
            setNewNum('');
          })
        }
      }
      
    return ( 
        <div>
        <h2>Add new</h2>
        <form onSubmit={addName}>
            <div> name: <input value={newName} onChange={handleChange}/> </div>
            <div> number: <input value={newNum} onChange={handleNumChange}/> </div>
            <div> <button type="submit">add</button> </div>
        </form>
        </div>
    );
}



const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState('Notify');
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() =>
    {personService
    .getAll()
    .then(returnList => {
      console.log(returnList, 'get request')
      setPersons(returnList)
    })
  }, [])
  

  const removePerson = (name,id) => {
    if (window.confirm(`Delete ${name}?`)){
      personService
        .remove(id)
        .then(response => {
            setPersons(persons.filter(person => id !== person.id))
            setMessage(`Deleted ${name}`)
            setTimeout(() => {
              setMessage(null)
            }, 4000);
        })
    }
  }

  const updatePerson = (name, number) => {
    if (window.confirm(`${name} is already in PhoneBook. Replace the old number with new number?`)){
      const p = persons.find(e => e.name === name);
      const personObject = {...p, number:number};
      personService
        .update(personObject)
        .then(response => {
          setPersons(persons.map(person => personObject.id !== person.id ? person : response))
          setMessage(`Updated ${name}`);
          setTimeout(() => {
            setMessage(null)
          }, 4000);
        })
        .catch(error => {
          setMessage(null)
          setErrorMessage(`Information of ${name} has already been deleted from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000);
        })
    }
  }

  const toShow = newFilter ? persons.filter(p => p.name.substring(0,newFilter.length).toUpperCase() == newFilter.toUpperCase()): persons;

    return (
        <div>
          <h2>Phonebook</h2>
          <Message message={message}/>
          <ErrorMessage error={errorMessage}/>
          <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
          <AddName newName = {newName} newNum={newNum} setNewName={setNewName} setNewNum={setNewNum} persons={persons} setPersons={setPersons} updatePerson={updatePerson}/>

          <h2>Numbers</h2>
          {toShow.map(p => <Person key={p.id} person={p} removePerson={removePerson} />)}
        </div>
      );
    
}

export default App;

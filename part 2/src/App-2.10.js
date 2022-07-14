import { useState } from 'react'


const Filter = ({newFilter, setNewFilter}) => {

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    }

    return (
        <div>
            <form>
            filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
            </form>
        </div> 
    );
}

const AddName = ({newName, newNum, setNewName, setNewNum, persons, setPersons}) => {
    const handleChange = (event) => {
        setNewName(event.target.value);
    }
    const handleNumChange = (event) => {
        setNewNum(event.target.value);
    }

    const addName = (event) => {
        event.preventDefault();
        if (persons.some(person => person.name === newName)) window.alert(`${newName} already exists in phonebook`);
        else{
          setPersons(persons.concat({name:newName, number:newNum}));
          setNewName('');
          setNewNum('');
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]); 
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const toShow = newFilter ? persons.filter(p => p.name.substring(0,newFilter.length).toUpperCase() == newFilter.toUpperCase()): persons;
  

 



    return (
        <div>
          <h2>Phonebook</h2>
          <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
            {/* <div>
                <form>
                filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
                </form>
            </div> */}
          <AddName newName = {newName} newNum={newNum} setNewName={setNewName} setNewNum={setNewNum} persons={persons} setPersons={setPersons} />

          <h2>Numbers</h2>
          {toShow.map(p => <li key={p.name}> {p.name} {p.number} </li>)}
        </div>
      );
    
//   return (
//     <div>
//       <h2>Phonebook</h2>
//         <div>
//             <form>
//             filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
//             </form>
//         </div>
//       <h2>Add new</h2>
//       <form onSubmit={addName}>

//         <div>
//           name: <input value={newName} onChange={handleChange}/>
//         </div>
//         <div>number: <input value={newNum} onChange={handleNumChange}/>
//         </div>

//         <div>
//           <button type="submit">add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       {toShow.map(p => <li key={p.name}> {p.name} {p.number} </li>)}
//     </div>
//   );
}

export default App;

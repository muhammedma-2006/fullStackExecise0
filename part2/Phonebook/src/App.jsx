import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
 
 const handleNnameChange = (event) => {
       setNewName(event.target.value)  

  }
  
  const handlePerson = (event) => {
  event.preventDefault();
    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())){
      alert(`${newName} is already added to phonebook`)
    }
      setPersons([...persons, {name: newName, number: newNumber, id: persons.length + 1}])
   setNewName('');
   setNewNumber('');
  }
  const filteredPersons = 
    persons.filter(person =>
       person.name.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div>
      <h2>Phonebook</h2>
      
        <Filter 
                filter={filter}
                handleFilterChange={(e) => setFilter(e.target.value)} 
        />
        <h2>Add a new</h2>
      <PersonForm 
              handlePerson={handlePerson}
              newName={newName}
              handleNnameChange={handleNnameChange}
              newNumber={newNumber}
              handleNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={filteredPersons} />
    </div>
  )
}


export default App
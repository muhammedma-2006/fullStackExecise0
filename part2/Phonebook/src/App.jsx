import { useEffect, useState  } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Personservices from './services/Personservices';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [errormessage, setErrormessage] = useState(null);
 


useEffect(() => {
  Personservices
  .getAll()
  .then(response => {
    setPersons(response.data);
  })
}, [])

 const handleNnameChange = (event) => {
       setNewName(event.target.value)  

  }
  
  const handlePerson = (event) => {
  event.preventDefault();

  if(persons
      .some(person => 
        person.name.toLowerCase() === newName.toLowerCase())){

    if (window.confirm(`${newName} is already added to phonebook, Do you want to update the number?`)) {
    const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
    const updatedPerson = { ...person, number: newNumber };
    Personservices
      .update(person.id, updatedPerson)
      .then(response => {
        setPersons(persons.map(p => p.id !== person.id ? p : response.data));
        setNewName('');
        setNewNumber('');
      
      })
      .catch(error => {
        setErrormessage(`Information of ${newName} has already been removed from server`);
        setTimeout(() => {
          setErrormessage(null);
        }, 5000);
      });
    }
  }
  else {
  Personservices.create({ name: newName,
                          number: newNumber})
    .then(response => {
      setPersons(persons.concat(response.data));
      setNotification(`Added ${newName}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setNewName('');
      setNewNumber('');
    })
    .catch(error => {
      setErrormessage(error.response.data.error);
      setTimeout(() => {
        setErrormessage(null);
      }, 5000);
    });
  }
  }
  

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (person && window.confirm(`Delete ${person.name}?`)) {
      Personservices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .then(
          setNotification(`Deleted ${person.name}`),
          setTimeout(() => {
            setNotification(null);
          }, 5000)
        )
        .catch(error => {
          setErrormessage(`Information of ${person.name} has already been removed from server`);
          setTimeout(() => {
            setErrormessage(null);
          }, 5000);
        }
        );
    }
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
      <Persons  personsToShow={filteredPersons} 
                handleDelete={handleDelete} />
    </div>
  )
}


export default App
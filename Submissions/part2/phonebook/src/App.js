import React, { useState, useEffect } from 'react';
import axios from 'axios';

import EntryFilterInput from './components/EntryFilterInput';
import NewEntryForm from './components/NewEntryForm';
import EntryList from './components/EntryList';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(result => setPersons(result.data));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <EntryFilterInput 
        filterText={filterText} 
        setFilterText={newFilterText => setFilterText(newFilterText)} 
      />
      <h2>Add a new entry</h2>
      <NewEntryForm 
        persons={persons} 
        addNewPerson={person => setPersons(persons.concat(person))}
      />
      <h2>Entries</h2>
      <EntryList persons={persons} filterText={filterText} />
    </div>
  );
};

export default App;

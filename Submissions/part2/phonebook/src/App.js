import { useState, useEffect } from 'react';
import personService from './services/persons';

import EntryFilterInput from './components/EntryFilterInput';
import NewEntryForm from './components/NewEntryForm';
import EntryList from './components/EntryList';
import TemporaryErrorMessage from './components/TemporaryErrorMessage';
import TemporarySuccessMessage from './components/TemporarySuccessMessage';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterText, setFilterText] = useState('');
  // Since the messages won't update as long as text and timeout remain the 
  // same, the time attribute is used to determine whether the user has 
  // triggered the same message multiple times in a row.
  const [successMessage, setSuccessMessage] = useState({
    text: '',
    timeout: 0,
    time: Date.now()
  });
  const [errorMessage, setErrorMessage] = useState({
    text: '',
    timeout: 0,
    time: Date.now()
  });

  useEffect(() => {
    (async () => {
      console.log('Fetching persons from server...');
      const personsOnServer = await personService.getAll();
      console.log(`...fetched ${personsOnServer.length} persons.`);
      setPersons(personsOnServer);
    })();
  }, []);

  // It would be more convenient to simply reset the error message inside of the
  // TemporaryMessage components but that's not really their responsibility IMO.
  // So effectively I have designed this for a hypothetical scenario where other
  // components might want to use the messages without having to worry about the 
  // timeouts making the messages disappear.

  return (
    <div>
      <h1>Phonebook</h1>
      <TemporaryErrorMessage 
        text={errorMessage.text} 
        timeout={errorMessage.timeout}
        time={errorMessage.time}
      />
      <TemporarySuccessMessage 
        text={successMessage.text} 
        timeout={successMessage.timeout}
        time={successMessage.time}
      />
      <h2>Filter entries</h2>
      <EntryFilterInput 
        filterText={filterText} 
        setFilterText={setFilterText} 
      />
      <h2>Add a new entry</h2>
      <NewEntryForm 
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
      <h2>Entries</h2>
      <EntryList 
        persons={persons}
        setPersons={setPersons}
        filterText={filterText}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
    </div>
  );
};

export default App;

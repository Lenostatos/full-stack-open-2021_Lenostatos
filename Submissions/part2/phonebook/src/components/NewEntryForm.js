import React, { useState } from 'react';

const LabelledTextInput = ({ label, value, setValue, required }) => (
  <label>
    {label + ' '}
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      required={required}
    />
  </label>
);

// Allows for new entries to the phonebook
const NewEntryForm = ({ persons, addNewPerson }) => {
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  function handleNewPerson(e) {
    e.preventDefault();

    // prevent the addition of already present names
    if (persons.find(person => person.name === newName.trim())) {
      alert(`There is already an entry for ${newName.trim()} in the phonebook`);
      return;
    }

    addNewPerson({
      name: newName.trim(),
      number: newPhoneNumber.trim() 
    });
    setNewName('');
    setNewPhoneNumber('');
  }

  return(
    <form onSubmit={handleNewPerson}>
      <LabelledTextInput 
        label={'name:'} 
        value={newName} 
        setValue={setNewName}
        required={true}
      />
      <br />
      <LabelledTextInput 
        label={'phone number:'} 
        value={newPhoneNumber} 
        setValue={setNewPhoneNumber}
        required={true}
      />
      <br />
      <button type="submit"> add </button>
    </form>
  );
};

export default NewEntryForm;

import { useState } from 'react';
import personService from '../services/persons';

// Allows adding to and updating entries in the phonebook
const NewEntryForm = ({ 
  persons,
  setPersons, 
  setSuccessMessage, 
  setErrorMessage 
}) => {
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  // Adds a new person to both the server and the persons state array.
  async function addNewPerson(person) {
    try {
      console.log(`Posting "${person.name}" to the server...`);
      const newPersonOnServer = await personService.addNew(person);
      console.log(`...posted "${person.name}" with id`, newPersonOnServer.id);
      
      setPersons(persons.concat(newPersonOnServer));
      setSuccessMessage({ 
        text: `Added ${newPersonOnServer.name} to the phonebook.`,
        timeout: 5000,
        time: Date.now()
      });
    } catch (error) {
      console.log(`...FAILED adding "${person.name}" to the server.`);
      console.log(error.config);
      setErrorMessage({
        text: `Error: Adding ${person.name} failed!`,
        timeout: 5000,
        time: Date.now()
      });
    }
  }

  // Updates the number of a person on both the server and the persons state 
  // array.
  async function updateNumber(updatedPerson) {
    try {
      console.log(`Updating "${updatedPerson.name}"'s number on the server...`);
      const personOnServer = await personService.updatePerson(updatedPerson);
      console.log(`...updated "${updatedPerson.name}"'s number.`);
      
      setPersons(persons.map(
        person => person.id === personOnServer.id 
          ? personOnServer 
          : person
      ));
      setSuccessMessage({
        text: `Updated ${updatedPerson.name}'s number to ` +
              `${updatedPerson.number}`,
        timeout: 5000,
        time: Date.now()
      });

    } catch (error) {

      console.log(
        `...FAILED updating "${updatedPerson.name}"'s number on the server.`
      );
      console.log(error.config);

      // check if the person is missing on the server and if yes, remove it
      if (error.response && error.response.status === 404) {
        setPersons(persons.filter(person => person.id !== updatedPerson.id));
        setErrorMessage({
          text: `Error: ${updatedPerson.name} has already been removed from ` +
                `the server`,
          timeout: 5000,
          time: Date.now()
        });
      } else {
        setErrorMessage({
          text: `Error: Updating ${updatedPerson.name}'s number failed!`,
          timeout: 5000,
          time: Date.now()
        });
      }
    }
  }

  // Handles the submits though the form.
  async function handleNewPersonSubmit(e) {
    e.preventDefault();

    console.log('Called handleNewPersonSubmit...');

    const trimmedNewName = newName.trim();
    const trimmedNewNumber = newPhoneNumber.trim();

    const duplicate = persons.find(person => person.name === trimmedNewName);
    // Deal with cases where a person's name is already in the phonebook.
    if (duplicate) {
      console.log('duplicated name');
      // If their number is also identical, just don't add them.
      if (duplicate.number === trimmedNewNumber) {
        console.log('and same number');
        console.log('error message at', Date.now());
        setErrorMessage({
          text: `There is already an entry for ${duplicate.name} in the ` +
                `phonebook.`,
          timeout: 5000,
          time: Date.now()
        });
        return;
      }
      // If the number is different, ask the user whether they want to update it
      if (window.confirm(
        `${duplicate.name} already has an entry in the phone book. Do you ` +
        `want to update their phone number to ${trimmedNewNumber}? ` +
        `(current number: ${duplicate.number})`
      )) {
        await updateNumber({ ...duplicate, number: trimmedNewNumber });
        setNewName('');
        setNewPhoneNumber('');
        return;
      } else {
        return;
      }
    }

    await addNewPerson({
      name: trimmedNewName,
      number: trimmedNewNumber
    });
    setNewName('');
    setNewPhoneNumber('');
  }

  return(
    <form onSubmit={handleNewPersonSubmit}>
      <label>
        {'name: '}
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          required={true}
        />
      </label>
      <br />
      <label>
        {'phone number: '}
        <input
          value={newPhoneNumber}
          onChange={e => setNewPhoneNumber(e.target.value)}
          required={true}
        />
      </label>
      <br />
      <button type="submit"> add </button>
    </form>
  );
};

export default NewEntryForm;

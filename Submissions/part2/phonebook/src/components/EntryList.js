import personService from "../services/persons";

const EntryList = ({ 
  persons, 
  setPersons, 
  filterText, 
  setSuccessMessage,
  setErrorMessage
}) => {

  async function deletePerson(person) {
    if (!window.confirm(`Do you really want to delete ${person.name}?`)) {
      return;
    }

    try {

      console.log(`Deleting "${person.name}" from the server...`);
      await personService.deletePerson(person);
      console.log(`...finished deleting "${person.name}" from the server.`);

      setPersons(persons.filter(p => p.id !== person.id));
      setSuccessMessage({ text: 'Deleted ' + person.name, timeout: 5000 });

    } catch (error) {

      // if the person has already been deleted on the server, everything's fine
      if (error.response && error.response.status === 404) {
        setPersons(persons.filter(p => p.id !== person.id));
        setSuccessMessage({ text: 'Deleted ' + person.name, timeout: 5000 });
      } else {
        console.log(`...FAILED deleting "${person.name}" from the server.`);
        console.log(error.config);
        
        setErrorMessage({
          text: `Error: Deleting "${person.name}" failed!`, 
          timeout: 5000
        });
      }
    }
  }

  let filteredPersons = [];

  if (filterText.trim() === '') {
    filteredPersons = persons;
  } else {
    filteredPersons = persons.filter(person => (
      person.name.toLowerCase().indexOf(
        filterText.toLowerCase().trim()
      ) !== -1
    ));
  }

  return(
    filteredPersons.length === 0
      ? <p>No person found for{` "${filterText}"`}</p>
      : filteredPersons.map(person => (
          <li key={person.name}>
            {`${person.name}: ${person.number} `}
            <button onClick={() => deletePerson(person)}>
              delete
            </button>
          </li>
    ))
  );
};

export default EntryList;
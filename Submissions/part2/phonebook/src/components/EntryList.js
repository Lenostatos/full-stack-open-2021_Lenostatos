import React from 'react';

const EntryList = ({ persons, filterText }) => {

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
    filteredPersons.map(person => (
      <li key={person.name}> {`${person.name}: ${person.number}`} </li>
    ))
  );
};

export default EntryList;
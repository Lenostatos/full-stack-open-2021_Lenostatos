import axios from "axios";

const baseUrl = '/api/persons';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addNew = async person => {
  const response = await axios.post(baseUrl, person);
  return response.data;
};

const deletePerson = async person => {
  const response = await axios.delete(`${baseUrl}/${person.id}`);
  return response.data;
};

const updatePerson = async updatedPerson => {
  const response = await axios.put(
    `${baseUrl}/${updatedPerson.id}`, 
    updatedPerson
  );
  return response.data;
};

const personService = { getAll, addNew, deletePerson, updatePerson };
export default personService;
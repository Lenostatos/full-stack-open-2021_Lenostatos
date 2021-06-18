import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  }

  let response;
  try {
    response = await axios.get(baseUrl);
  } catch (error) {
    console.log(
      'Error while fetching notes from ' + baseUrl, 
      JSON.parse(JSON.stringify(error))
    );
    throw error;
  }
  response.data.push(nonExisting);
  return response.data;
};

const create = async newObject => {
  let response;
  try {
    response = await axios.post(baseUrl, newObject);
  } catch (error) {
    console.log(
      'Error while posting new note to ' + baseUrl,
      JSON.parse(JSON.stringify(error))
    );
    throw error;
  }
  return response.data;
};

const update = async newNote => {
  return await axios.put(`${baseUrl}/${newNote.id}`, newNote);
  // const noteURL = `${baseUrl}/${id}`;
  // let response;
  // try {
  //   response = await axios.put(noteURL, newObject);
  // } catch (error) {
  //   console.log(
  //     'Error while updating note at ' + noteURL,
  //     JSON.parse(JSON.stringify(error))
  //   );
  //   throw error;
  // }
  // return response.data;
};

const noteService = { getAll, create, update };

export default noteService;
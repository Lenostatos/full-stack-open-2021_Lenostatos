import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  useEffect(() => {
    console.log('use effect to load notes');
    noteService
      .getAll()
      .then(notesOnServer => setNotes(notesOnServer));
  }, []);
  console.log('render', notes.length, 'notes');


  async function toggleImportanceOf(note) {
    const toggledNote = { ...note, important: !note.important };

    let updateResponse;
    try {
      updateResponse = await noteService.update(toggledNote);
      setNotes(notes.map(note => note.id === toggledNote.id
        ? updateResponse.data
        : note
      ));
    } catch (error) {
      // Error handling copied from https://axios-http.com/docs/handling_errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if (error.response.status === 404) {
          // According to 
          // https://developer.mozilla.org/en-US/docs/Web/API/Console/log#logging_objects
          // the JSON.parse(JSON.stringify(...)) prevents automatic updating of
          // the logged object in the browser console. Probably not necessary in
          // this case but the more you know...
          console.log(
            'Missing note on the server:', JSON.parse(JSON.stringify(note))
          );
          setNotes(notes.filter(note => note.id !== toggledNote.id));
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }

  async function addNote(e) {
    e.preventDefault();

    const newNoteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    };

    const newNoteOnServer = await noteService.create(newNoteObject);
    console.log('Sent note to server');
    setNotes(notes.concat(newNoteOnServer));
    
    setNewNote('');
  }

  const notesToShow = showImportantOnly
    ? notes.filter(note => note.important)
    : notes;
  
  return(
    <div>
      <h1>Notes</h1>
      <label>
        <input 
          type='checkbox' 
          checked={showImportantOnly} 
          onChange={e => setShowImportantOnly(e.target.checked)} 
        />
        {' '} Show only important notes
      </label>
      <ul>
        {notesToShow.map(note => (
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note)} 
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input 
          type='text' 
          value={newNote} 
          onChange={e => setNewNote(e.target.value)} 
        />
        <button type='submit'>Add note</button>
      </form>
    </div>
  );
};

export default App;

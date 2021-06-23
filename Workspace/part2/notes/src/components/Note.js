const Note = ({ note, toggleImportance }) => (
  <li className='note'>
    <label>
      {note.content + ' '}
      <button onClick={toggleImportance}>
        {note.important
          ? 'important'
          : 'not important'}
      </button>
    </label>
  </li>
);

export default Note;
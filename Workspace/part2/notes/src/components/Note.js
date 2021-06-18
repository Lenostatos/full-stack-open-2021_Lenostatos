const Note = ({ note, toggleImportance }) => (
  <li>
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
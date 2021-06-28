const EntryFilterInput = ({ filterText, setFilterText }) => (
  <label>
    filter: {' '}
    <input 
      value={filterText}
      onChange={e => setFilterText(e.target.value)}
    />
  </label>
);

export default EntryFilterInput;
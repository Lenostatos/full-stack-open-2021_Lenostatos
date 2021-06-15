import React from 'react';

const EntryFilterInput = ({ filterText, setFilterText }) => (
  <label>
    show only entries containing {' '}
    <input 
      value={filterText}
      onChange={e => setFilterText(e.target.value)}
    />
  </label>
);

export default EntryFilterInput;
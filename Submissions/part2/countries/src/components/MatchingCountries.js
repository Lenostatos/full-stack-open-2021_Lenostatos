import CountryList from './CountryList';

// Displays a list of countries or a message if there are none or too many.
const MatchingCountries = ({ 
  matchingCountries,
  searchText, 
  selectCountry 
}) => {

  if (matchingCountries.length === 0) {
    return <p>No countries found for{` "${searchText}"`}.</p>;
  }

  if (matchingCountries.length > 10) {
    return (
      <p>
        Too many matching countries. 
        Please provide a more specific search term.
      </p>
    );
  }
  
  return (
    <CountryList 
      countries={matchingCountries} 
      selectCountry={selectCountry}
    />
  );
};

export default MatchingCountries;
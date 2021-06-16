import FullCountryInfo from "./FullCountryInfo";
import MatchingCountries from "./MatchingCountries";

// Displays multiple matching countries as a list or detailed info about a
// single matching country.
const CountrySearchResult = ({ countries, searchText, selectCountry }) => {

  const matchingCountries = countries.filter(country => (
    country.name.toLowerCase().indexOf(
      searchText.trim().toLowerCase()
    ) !== -1
  ));

  if (matchingCountries.length === 1) {
    return <FullCountryInfo country={matchingCountries[0]} />;
  } else {
    return (
      <MatchingCountries
        matchingCountries={matchingCountries} 
        searchText={searchText} 
        selectCountry={selectCountry}
      />
    );
  }
};

export default CountrySearchResult;
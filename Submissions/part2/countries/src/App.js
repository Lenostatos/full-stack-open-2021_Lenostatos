import { useEffect, useState } from "react";
import axios from 'axios';
import FullCountryInfo from "./components/FullCountryInfo";
import CountrySearchResult from "./components/CountrySearchResult";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(result => setCountries(result.data));
    console.log('Loaded countries');
  }, []);

  const hasSelectedCountry = selectedCountry !== '';
  function unselectCountry() { setSelectedCountry(''); }

  return (
    <>
      <label>
        find countries: {' '}
        <input 
          value={searchText} 
          onChange={e => {
            unselectCountry();
            setSearchText(e.target.value);
          }}
        />
      </label>
      {
        hasSelectedCountry
          ? <FullCountryInfo 
              country={countries.find(country => (
                country.name === selectedCountry
              ))} />
          : (
            searchText.trim() === ''
              ? <p>Type in something above to search for countries.</p>
              : <CountrySearchResult 
                  countries={countries} 
                  searchText={searchText} 
                  selectCountry={setSelectedCountry}
                />
          )
      }
    </>
  );
};

export default App;

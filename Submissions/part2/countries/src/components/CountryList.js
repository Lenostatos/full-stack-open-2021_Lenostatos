// Renders a list of countries
const CountryList = ({ countries, selectCountry }) => (
  <ul>
    {countries.map(country => (
      <li key={country.name}>
        <label>
          {country.name + ' '}
          <button onClick={() => selectCountry(country.name)}>select</button>
        </label>
      </li>
    ))}
  </ul>
);

export default CountryList;
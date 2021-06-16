import { useState, useEffect } from "react";
import axios from 'axios';

const CapitalWeather = ({ weather, capital }) => {
  const currWeather = weather.current;
  return (
    <>
    <h3>Current weather in{' ' + capital}:</h3>
    <p>
      {`Temperature: ${currWeather.temp_c}°C`}<br/>
      {currWeather.precip_mm > 0
        ? <>{`Precipitation: ${currWeather.precip_mm} mm`}<br/></>
        : <>No precipitation<br/></>
      }
      <img 
        src={currWeather.condition.icon} 
        alt={`A symbol showing ${currWeather.condition.text.toLowerCase()} weather.`}
      /><br/>
      {`Wind: ${currWeather.wind_kph} km/h Direction: ${currWeather.wind_dir}`}<br/>
      Local Time:{' ' + weather.location.localtime}
    </p>
    <p>Weather information from{' '}
      <a href="https://www.weatherapi.com/" title="Free Weather API">
        WeatherAPI.com
      </a>
    </p>
    </>
  );
};

// Renders information on a single country
const FullCountryInfo = ({ country }) => {
  const [currentWeather, setCurrentWeather] = useState(undefined);

  useEffect(() => (
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?` +
        `key=${process.env.REACT_APP_API_KEY}&` +
        `q=${encodeURIComponent(country.capital)}&aqi=no`)
      .then(result => setCurrentWeather(result.data))
  ), [country]);
  console.log(country);
  console.log(currentWeather);
  if (currentWeather) console.log('http:' + currentWeather.current.condition.icon);
  
  return(
    <>
    <h2>{country.name}</h2>
    <p>
      Region:{' ' + country.region} <br/>
      Capital:{' ' + country.capital} <br/>
      Population:{' ' + new Intl.NumberFormat().format(country.population)} <br/>
      Area:{` ${new Intl.NumberFormat().format(country.area)} km²`} <br/>
      Population Density:{
        ` ${(country.population / country.area).toFixed(1)}/km²`
      }
    </p>
    <img 
      src={country.flag} 
      alt='Flag of the country.'
      style={{
        height: '100px',
        width: 'auto', 
        border: '1px solid #ddd'
      }}
    />
    {/* Image styling looked up at 
      https://www.w3schools.com/howto/howto_css_image_responsive.asp and
      https://www.w3schools.com/css/css3_images.asp
    */}
    {
      country.languages.length === 1
        ? <p>Language:{' ' + country.languages[0].name}</p>
        : <>
            <p>Languages:</p>
            <ul>
              {country.languages.map(language =>(
                <li key={language.name}>{language.name}</li>
              ))}
            </ul>
          </>
    }
    {currentWeather
      ? <CapitalWeather weather={currentWeather} capital={country.capital} />
      : null
    }
    </>
  );
};

export default FullCountryInfo;
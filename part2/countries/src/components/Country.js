import axios from 'axios'
import { useEffect, useState } from 'react'

export const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)
  const obj = country.languages
  const result = Object.keys(obj).map((key) => [obj[key]])
  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  const [countryName, countryCode] = [country.name.common, country.altSpellings[0]]

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryName},${countryCode}&appid=${api_key}&units=metric`)
      .then((response) => setWeatherData(response.data))
  }, [])

  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`

  console.log(weatherIconUrl, weatherData)

  return (
    <div>
      <h1>{country.name.common}</h1> <br />
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area} km²</div> <br />
      <div>Languages: {country.languages[0]}</div>
      <ul>
        {result.map((language, id) => {
          return <li key={id}>{language}</li>
        })}
      </ul>
      <img src={`${country.flags.png}`} alt="Country Flag" width={300} height={200}></img>
      <div style={{ marginTop: '20px' }}>
        {country.name.common} feels like {weatherData?.main?.feels_like} °C.
        <p>
          <img src={weatherIconUrl} alt="kekw"></img>
        </p>
        <div>Wind is at a speed of {weatherData?.wind?.speed}m/s.</div>
      </div>
    </div>
  )
}

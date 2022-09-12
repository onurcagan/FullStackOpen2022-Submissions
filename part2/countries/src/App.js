import { useState, useEffect } from 'react'
import { Country } from './components/Country'
import axios from 'axios'

export const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setNewCountry] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setNewCountry(response.data)
    })
  }, [])

  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  const countriesToShow = () => {
    if (newFilter === '') return 'Please start typing a country name.'
    if (filteredCountries.length === 1) return <Country country={filteredCountries[0]} />
    if (filteredCountries.length <= 10)
      return filteredCountries.map((item, index) => (
        <div key={index}>
          {item.name.common}
          <button
            style={{ marginLeft: 10 + 'px' }}
            onClick={() => {
              setNewFilter(`${item.name.common}`)
            }}
          >
            Show
          </button>
        </div>
      ))
    if (filteredCountries.length > 10) return 'Too many countries match your request, keep on typing.'
    else return 'Unhandled situation occurred, what did you do? Lol.'
  }

  return (
    <>
      <div>
        Find countries: <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)}></input>
      </div>
      <div>{countriesToShow()}</div>
    </>
  )
}

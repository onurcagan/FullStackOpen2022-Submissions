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

  const filter = countries.filter((country) => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  const filteredCountries = () => {
    if (newFilter === '') return 'Please start typing a country name.'
    if (filter.length === 1) return <Country filter={filter[0]} />
    if (filter.length <= 10) return filter.map((item, index) => <div key={index}>{item.name.common}</div>)
    if (filter.length > 10) return 'Too many countries match your request, keep on typing.'
    else return 'Unhandled situation occured, what did you do? Lol.'
  }

  return (
    <>
      <div>
        Find countries: <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)}></input>
      </div>
      <div>{filteredCountries()}</div>
    </>
  )
}

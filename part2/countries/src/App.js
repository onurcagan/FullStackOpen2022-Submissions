import { useState } from 'react'
// import axios from 'axios'

export const App = () => {
  const [newFilter, setNewFilter] = useState('')

  const filteredCountries = '' ? 'Please start typing a country name' : 'Whatever'

  return (
    <>
      <div>
        Find countries: <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)}></input>
      </div>
      <div>{filteredCountries}</div>
    </>
  )
}

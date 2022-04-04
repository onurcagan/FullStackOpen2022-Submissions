import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'DreamAbolisher55', phone: 123456789 }])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    /// Prevents the entry of empty names to the Phonebook.
    if (newName === '') {
      return
    }

    if (persons.some((e) => e.name === newName)) {
      window.alert(`${newName} is already added to the phonebook.`)
      return
    }

    const personObject = {
      name: newName,
      phone: newPhone,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((p) => (
          <li key={p.name}>
            {p.name} - {p.phone}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

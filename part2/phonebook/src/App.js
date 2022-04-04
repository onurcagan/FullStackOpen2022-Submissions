import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

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

  const personsFiltered =
    newFilter === '' ? persons : persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <div>debug:</div>
      <h2>Phonebook</h2>
      <div>
        filters shown with: <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsFiltered.map((p) => {
          return (
            <div key={p.id}>
              {p.name} - {p.phone}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App

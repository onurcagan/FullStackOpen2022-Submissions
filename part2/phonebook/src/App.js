import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

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
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>Add a new Person</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone} />
      <h3>Numbers</h3>
      <Persons filter={personsFiltered} />
    </div>
  )
}

export default App

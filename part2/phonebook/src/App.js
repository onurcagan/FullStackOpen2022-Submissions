import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])
  console.log('render')

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

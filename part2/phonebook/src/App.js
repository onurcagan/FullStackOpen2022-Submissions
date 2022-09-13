import { useState, useEffect } from 'react'
import { People } from './components/People.js'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { createNewPerson, deletePerson, getPeople, updatePerson } from './services/PeopleRequests'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    getPeople().then((person) => setPeople(person))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    /// Prevents the entry of empty names to the Phonebook.
    if (newName === '') {
      return
    }

    if (people.some((e) => e.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, would you like to update their phone number?`)) {
        const matchedExistingPerson = people.filter((person) => person.name === newName)[0]
        const updatedPerson = { ...matchedExistingPerson, number: newPhone }

        updatePerson(matchedExistingPerson.id, updatedPerson)

        setPeople(people.map((person) => (person.id !== matchedExistingPerson.id ? person : updatedPerson)))
        setNewName('')
        setNewPhone('')
      }
      return
    }

    const personObject = {
      name: newName,
      number: newPhone,
    }

    createNewPerson(personObject)

    setPeople(people.concat(personObject))
    setNewName('')
    setNewPhone('')
  }

  const deleteButtonOnClick = (id) => {
    if (window.confirm('are you sure about this?')) {
      deletePerson(id)
      setPeople(people.filter((p) => p.id !== id))
    }
    return
  }

  const personsFiltered =
    newFilter === '' ? people : people.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>Add a new Person</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone} />
      <h3>Numbers</h3>
      <People filter={personsFiltered} deleteButtonOnClick={deleteButtonOnClick} />
    </div>
  )
}

export default App

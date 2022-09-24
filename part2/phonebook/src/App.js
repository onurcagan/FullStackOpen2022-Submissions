import { useState, useEffect } from 'react'
import { People } from './components/People.js'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import { createNewPerson, deletePerson, getPeople, updatePerson } from './services/PeopleRequests'
import { NotificationMessage } from './components/NotificationMessage.js'

export const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const sendNotification = (message) => {
    setNotificationMessage(`${message}`)
    setTimeout(() => setNotificationMessage(''), 3000)
  }

  useEffect(() => {
    getPeople().then((person) => setPeople(person))
  }, [])

  const addPerson = async (event) => {
    event.preventDefault()

    // Prevents the entry of empty names to the Phonebook.
    if (newName === '') {
      return
    }

    if (people.some((e) => e.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, would you like to update their phone number?`)) {
        const matchedExistingPerson = people.filter((person) => person.name === newName)[0]
        const updatedPerson = { ...matchedExistingPerson, number: newPhone }

        updatePerson(matchedExistingPerson.id, updatedPerson)
          .then(setPeople(people.map((person) => (person.id !== matchedExistingPerson.id ? person : updatedPerson))))
          .catch((e) => {
            e.response.status === 400 && setErrorMessage(`User ${newName} has already been deleted from the server.`)
            getPeople().then((person) => setPeople(person)) // This is to refresh the list after realizing a contact was deleted from the server.
          })

        sendNotification(`User ${newName}'s contact details have been updated.`)
        setNewName('')
        setNewPhone('')
      }
      return
    }

    const personObject = {
      name: newName,
      number: newPhone,
    }

    await createNewPerson(personObject).then(setPeople(people.concat(personObject))) // waiting for post request to finish before using getPeople to fetch id for the latest entry.
    getPeople().then((person) => setPeople(person))
    setNewName('')
    setNewPhone('')
    sendNotification(`Added ${newName} to the phonebook.`)
  }

  const deleteButtonOnClick = (id) => {
    if (window.confirm('are you sure about this?')) {
      deletePerson(id)
      setPeople(people.filter((p) => p.id !== id))
      setErrorMessage(`User ${newName} have been deleted.`)
      setTimeout(() => setErrorMessage(''), 3000)
    }
    return
  }

  const peopleFiltered =
    newFilter === '' ? people : people.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      {(notificationMessage || errorMessage) && (
        <NotificationMessage notificationMessage={notificationMessage} errorMessage={errorMessage} />
      )}
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>Add a new Person</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone} />
      <h3>Numbers</h3>
      <People filter={peopleFiltered} deleteButtonOnClick={deleteButtonOnClick} />
    </div>
  )
}

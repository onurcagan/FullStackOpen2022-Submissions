import axios from 'axios'

const serverUrl = 'http://localhost:3001/persons'

export const getPeople = () => {
  const request = axios.get(serverUrl)
  return request.then((res) => res.data)
}

export const createNewPerson = (personObject) => {
  axios.post(serverUrl, personObject).catch((e) => console.error(e))
}

export const deletePerson = (id) => {
  axios.delete(`${serverUrl}/${id}`).catch((e) => console.error(e))
}

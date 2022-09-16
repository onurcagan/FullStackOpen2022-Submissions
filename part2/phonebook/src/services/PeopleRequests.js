import axios from 'axios'

const serverUrl = 'http://localhost:3001/people'

export const getPeople = () => {
  const request = axios.get(serverUrl)
  return request.then((res) => res.data)
}

export const createNewPerson = (personObject) => {
  return axios.post(serverUrl, personObject).catch((e) => console.error(e))
}

export const deletePerson = (id) => {
  axios.delete(`${serverUrl}/${id}`).catch((e) => {
    alert("seems we don't have this note so we can't delete it.")
    return console.error(e)
  })
}

export const updatePerson = (id, newPerson) => {
  const request = axios.put(`${serverUrl}/${id}`, newPerson)
  return request.then((response) => response.data)
}

import axios from 'axios'
const baseUrl = '/api/persons'

export const getPeople = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

export const createNewPerson = (personObject) => {
  return axios.post(baseUrl, personObject).catch((e) => console.error(e))
}

export const deletePerson = (id) => {
  axios.delete(`${baseUrl}/${id}`).catch((e) => {
    alert("seems we don't have this note so we can't delete it.")
    return console.error(e)
  })
}

export const updatePerson = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then((response) => response.data)
}

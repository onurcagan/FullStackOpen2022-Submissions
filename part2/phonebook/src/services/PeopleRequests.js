import axios from 'axios'
const baseUrl = '/api/persons'

export const getPeople = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

export const createNewPerson = (personObject) => {
  return axios.post(baseUrl, personObject)
}

export const deletePerson = (id) => {
  axios.delete(`${baseUrl}/${id}`).catch((e) => {
    alert("seems we don't have this note so we can't delete it.")
    return e.response.status
  })
}

export const updatePerson = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then((response) => response.data)
}

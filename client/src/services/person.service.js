import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url

const getPersons = (page) => {
	return axios.get(`${apiUrl}/v1/persons?limit=${config.table.resultsPerPage}&page=${page}`, {})
		.then(response => {
	    return response.data
	  })
}

// TODO update
const createPerson = (data) => {
	return axios.post(`${apiUrl}/v1/persons`, {
    data
  })
}

const updatePerson = (data) => {
  const {id, ...fields} = data;
	return axios.patch(`${apiUrl}/v1/persons/${id}`, fields)
}

const deletePerson = (personId) => {
	return axios.delete(`${apiUrl}/v1/persons/${personId}`, {})
}

export const personService = {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson,
}
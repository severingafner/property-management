import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url

const getPeople = (page) => {
	return axios.get(`${apiUrl}/v1/people?limit=${config.table.resultsPerPage}&page=${page}`, {})
		.then(response => {
	    return response.data
	  })
}

// TODO update
const createPerson = (data) => {
	return axios.post(`${apiUrl}/v1/people`, {
    data
  })
}

const updatePerson = (data) => {
  const {id, ...fields} = data;
	return axios.patch(`${apiUrl}/v1/people/${id}`, fields)
}

const deletePerson = (personId) => {
	return axios.delete(`${apiUrl}/v1/people/${personId}`, {})
}

export const personService = {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
}
import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url

const getCreditors = (page) => {
	return axios.get(`${apiUrl}/v1/creditors?limit=${config.table.resultsPerPage}&page=${page}`, {})
		.then(response => {
	    return response.data
	  })
}
const getCreditor = (creditorId) => {
  return axios.get(`${apiUrl}/v1/creditors/${creditorId}`, {})
}

const createCreditor = (data) => {
	return axios.post(`${apiUrl}/v1/creditors`, {
    data
  })
}

const updateCreditor = (data) => {
  const {id, ...fields} = data;
	return axios.patch(`${apiUrl}/v1/creditors/${id}`, fields)
}

const deleteCreditor = (creditorId) => {
	return axios.delete(`${apiUrl}/v1/creditors/${creditorId}`, {})
}

export const creditorService = {
  getCreditors,
  getCreditor,
  createCreditor,
  updateCreditor,
  deleteCreditor,
}
import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url

const getProperties = (page) => {
	return axios.get(`${apiUrl}/v1/properties?limit=${config.table.resultsPerPage}&page=${page}`, {})
		.then(response => {
	    return response.data
	  })
}
const getProperty = (propertyId) => {
  return axios.get(`${apiUrl}/v1/properties/${propertyId}`, {})
}

const createProperty = (data) => {
	return axios.post(`${apiUrl}/v1/properties`, {
    data
  })
}

const updateProperty = (data) => {
  const {id, ...fields} = data;
	return axios.patch(`${apiUrl}/v1/properties/${id}`, fields)
}

const deleteProperty = (propertyId) => {
	return axios.delete(`${apiUrl}/v1/properties/${propertyId}`, {})
}

export const propertyService = {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
}
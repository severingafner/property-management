import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url

const createRentObject = (propertyId, data) => {
	return axios.post(`${apiUrl}/v1/properties/${propertyId}`, {
    data
  })
}

const updateRentObject = (propertyId, rentObjectId) => {
	return axios.delete(`${apiUrl}/v1/properties/${propertyId}/rentObject/${rentObjectId}`, {})
}

const deleteRentObject = (propertyId, rentObjectId) => {
	return axios.delete(`${apiUrl}/v1/properties/${propertyId}/rentObject/${rentObjectId}`, {})
}

export const rentObjectService = {
  createRentObject,
  deleteRentObject,
}
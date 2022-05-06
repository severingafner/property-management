import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url

const getContracts = (page) => {
	return axios.get(`${apiUrl}/v1/contracts?limit=${config.table.resultsPerPage}&page=${page}`, {})
		.then(response => {
	    return response.data
	  })
}
const getContract = (contractId) => {
  return axios.get(`${apiUrl}/v1/contracts/${contractId}`, {})
}

const createContract = (data) => {
	return axios.post(`${apiUrl}/v1/contracts`, {
    data
  })
}

const updateContract = (data) => {
  const {id, ...fields} = data;
	return axios.patch(`${apiUrl}/v1/contracts/${id}`, fields)
}

const deleteContract = (contractId) => {
	return axios.delete(`${apiUrl}/v1/contracts/${contractId}`, {})
}

export const contractService = {
  getContracts,
  getContract,
  createContract,
  updateContract,
  deleteContract,
}
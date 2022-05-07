import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url

const getBills = (page) => {
	return axios.get(`${apiUrl}/v1/bills?limit=${config.table.resultsPerPage}&page=${page}`, {})
		.then(response => {
	    return response.data
	  })
}
const getBill = (billId) => {
  return axios.get(`${apiUrl}/v1/bills/${billId}`, {})
}

const createBill = (data) => {
	return axios.post(`${apiUrl}/v1/bills`, {
    data
  })
}

const updateBill = (data) => {
  const {id, ...fields} = data;
	return axios.patch(`${apiUrl}/v1/bills/${id}`, fields)
}

const deleteBill = (billId) => {
	return axios.delete(`${apiUrl}/v1/bills/${billId}`, {})
}

export const billService = {
  getBills,
  getBill,
  createBill,
  updateBill,
  deleteBill,
}
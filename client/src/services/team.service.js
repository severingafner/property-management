import axios from 'axios'
import { config } from '../assets/config/config'

const apiUrl = config.api.url

const createTeam = (name) => {
	return axios.post(`${apiUrl}/v1/team`, {
    name: name,
  })
}

const setActiveTeam = (teamId) => {
  return axios.post(`${apiUrl}/v1/team/set-active-team`, {
    teamId: teamId,
  })
}

const getTeam = (teamId) => {
  return axios.get(`${apiUrl}/v1/team/${teamId}`, {})
}

const updateTeam = (teamId, name) => {
	return axios.patch(`${apiUrl}/v1/team/${teamId}`, {
    name: name,
  })
}

const leaveTeam = (teamId) => {
  return axios.post(`${apiUrl}/v1/team/${teamId}`, {})
}

const deleteTeam = (teamId) => {
  return axios.delete(`${apiUrl}/v1/team/${teamId}`, {})
}

const createInvitation = (teamId, email, role) => {
  return axios.post(`${apiUrl}/v1/team/${teamId}/invitation`, {
    email: email,
    role: role,
  })
}

const getInvitation = (teamId, invitationId) => {
  return axios.get(`${apiUrl}/v1/team/${teamId}/invitation/${invitationId}`, {})
}

const handleInvitation = (teamId, invitationId, accepted) => {
  return axios.post(`${apiUrl}/v1/team/${teamId}/invitation/${invitationId}`, {
    accepted: accepted,
  })
}

const deleteInvitation = (teamId, invitationId) => {
  return axios.delete(`${apiUrl}/v1/team/${teamId}/invitation/${invitationId}`, {})
}

const updateUser = (teamId, userId, role) => {
  return axios.patch(`${apiUrl}/v1/team/${teamId}/user/${userId}`, {
    role: role,
  })
}

const deleteUser = (teamId, userId) => {
  return axios.delete(`${apiUrl}/v1/team/${teamId}/user/${userId}`, {})
}

export const teamService = {
  createTeam,
  setActiveTeam,
  getTeam,
  updateTeam,
  leaveTeam,
  deleteTeam,
  createInvitation,
  getInvitation,
  handleInvitation,
  deleteInvitation,
  updateUser,
  deleteUser,
}
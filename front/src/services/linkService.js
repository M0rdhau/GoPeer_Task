import axios from 'axios'
const baseUrl = '/links'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const popualteDB = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(`${baseUrl}/populate`, config)
  return response
}

const addUrl = async (destURL) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, { destURL }, config)
  return response
}

const getAllUrls = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  return response
}

const deleteUrl = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const getSingleUrl = async (id, timeData) => {
  const config = {
    headers: { Authorization: token }
  }
  const reqUrl = `${baseUrl}/stats/${id}/${timeData.from}/${timeData.to}/${timeData.type}`
  const response = await axios.get(reqUrl, config)
  return response
}

export default { setToken, addUrl, getAllUrls, getSingleUrl, deleteUrl, popualteDB }
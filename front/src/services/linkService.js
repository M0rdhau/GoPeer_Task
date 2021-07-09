import axios from 'axios'
const baseUrl = '/links'

const addUrl = async (user, destURL) => {
  const config = {
    headers: { Authorization: `bearer ${user.token}` }
  }
  const response = await axios.post(baseUrl, { destURL }, config)
  return response
}

export default { addUrl }
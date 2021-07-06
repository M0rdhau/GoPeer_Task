const Link = require('../models/link')
// const Visit = require('../models/visit')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getLinksByUserToken = async (token) => {
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(token || !decodedToken.userId){
    return { error: true, code: 401, message: 'token missing or invalid' }
  }

  const user = await User.findById(decodedToken.userId)

  const links = await Link
    .find({ user: user.id })
    .populate('user', { username: 1, name: 1 })

  return links
}

module.exports = {
  getLinksByUserToken,
}
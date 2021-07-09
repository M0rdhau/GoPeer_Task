const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const login = async (request) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return { error: true, code: 400, message: 'invalid username or password' }
  }

  const userForToken = {
    username: user.username,
    userId: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  return { code: 200, data: { token, username: userForToken.username } }
}

module.exports = {
  login
}
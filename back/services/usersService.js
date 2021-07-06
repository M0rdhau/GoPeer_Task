const User = require('../models/user')
const bcrypt = require('bcrypt')

const MIN_LENGTH = 3

const getAllUsers = async () => {
  const users = await User.find({}).populate('links', { title: 1, author: 1 })
  return users
}

const addUser = async (request) => {
  const body = request.body

  if(body.username.length < MIN_LENGTH || body.password.length < MIN_LENGTH){
    return { error: true, code: 406, message: 'Username too short' }
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
  })

  try{
    const savedUser = await user.save()
    return { code: 201, data: savedUser }
  }catch (e){
    return { error: true, code: 406, message: 'Username must be unique' }
  }
}

module.exports = {
  getAllUsers,
  addUser
}
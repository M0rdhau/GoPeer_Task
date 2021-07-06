const usersRouter = require('express').Router()
const usersService = require('../services/usersService')

usersRouter.get('/', async (request, response) => {
  response.json(await usersService.getAllUsers())
})

usersRouter.post('/', async (request, response) => {
  const savedUser = await usersService.addUser(request)
  if(savedUser.error === true){
    response
      .status(savedUser.code)
      .append('error', savedUser.message)
      .send()
  }else{
    response.json(savedUser)
  }
})

module.exports = usersRouter
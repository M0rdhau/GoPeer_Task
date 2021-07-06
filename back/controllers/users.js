const usersRouter = require('express').Router()
const usersService = require('../services/usersService')
const routerHelperService = require('../services/routerHelperService')

usersRouter.get('/', async (request, response) => {
  response.json(await usersService.getAllUsers())
})

usersRouter.post('/', async (request, response) => {
  const savedUser = await usersService.addUser(request)
  routerHelperService.handleResponse(savedUser, response)
})

module.exports = usersRouter
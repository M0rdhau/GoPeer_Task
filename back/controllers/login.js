const loginRouter = require('express').Router()
const loginService = require('../services/loginService')
const routerHelperService = require('../services/routerHelperService')

loginRouter.post('/', async (request, response) => {
  const res = await loginService.login(request)
  routerHelperService.handleResponse(res, response)
})

module.exports = loginRouter
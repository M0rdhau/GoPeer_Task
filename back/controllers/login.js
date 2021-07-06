const loginRouter = require('express').Router()
const loginService = require('../services/loginService')

loginRouter.post('/', async (request, response) => {
  const res = await loginService.login(request)
  if(res.error === true){
    response
      .status(res.code)
      .append('error', res.message)
      .send()
  }else{
    response
      .status(200)
      .json(res)
  }
})

module.exports = loginRouter
const linksRouter = require('express').Router()
const linksService = require('../services/linksService')
const routerHelperService = require('../services/routerHelperService')

linksRouter.get('/', async (request, response) => {
  const linksList = await linksService.getLinksByUserToken(request.token)
  routerHelperService.handleResponse(linksList, response)
})

linksRouter.get('/:id', async (request, response) => {
  await linksService.getLinkByID(request, response)
})

linksRouter.post('/', async (request, response) => {
  const linkCreated = await linksService.createLink(request)
  routerHelperService.handleResponse(linkCreated, response)
})

linksRouter.delete('/:id', async (request, response) => {
  const linkRemoved = await linksService.deleteLink(request)
  routerHelperService.handleResponse(linkRemoved, response)
})

module.exports = linksRouter


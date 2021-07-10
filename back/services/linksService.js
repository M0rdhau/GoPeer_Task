const Link = require('../models/link')
const Visit = require('../models/visit')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const TOKEN_ERROR = { error: true, code: 401, message: 'token missing or invalid' }

const getLinksByUserToken = async (token) => {
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.userId){
    return TOKEN_ERROR
  }

  const user = await User.findById(decodedToken.userId)

  let links = await Link
    .find({ user: user.id })
  links = links.map(link => link.toJSON())
    .map(link => ({
      destURL: link.destURL,
      id: link.id,
      visits: link.visits.length
    }))
  return { code: 200, data: links }
}

const getLinkStatsByID = async (request) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.userId){
    return TOKEN_ERROR
  }
  const link = await Link.findById(request.params.id)

  if(decodedToken.userId.toString() !== link.user.toString()){
    return TOKEN_ERROR
  }

  const from  = new Date(body.from)
  const to = new Date(body.to)
  const type = body.type


  let sortType = ''

  switch(type){
  case 'day':
    sortType = '%Y-%m-%d'
    break
  case 'month':
    sortType = '%Y-%m'
    break
  case 'year':
    sortType = '%Y'
    break
  default:
    return { error: true, code: 400, message: 'can only group by day/month/year' }
  }

  const visits = await Visit
    .aggregate([
      { $match: { _id: { $in: link.visits }, date: { $gte: from, $lt: to } } },
      {
        $group: {
          _id: { $dateToString: { format: sortType, date: '$date' } },
          count: { $sum: 1 }
        }
      }
    ])

  return { code: 200, data: visits }
}

const getLinkByID = async (request, response) => {
  const link = await Link.findById(request.params.id)

  if(link){
    const visit = new Visit({
      link: request.params.id
    })
    const savedVisit = await visit.save()
    link.visits = link.visits.concat(savedVisit.id)
    await link.save()
    response.redirect(link.destURL)
  } else {
    response.status(404).end()
  }
}

const createLink = async (request) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.userId){
    return TOKEN_ERROR
  }
  const user = await User.findById(decodedToken.userId)

  const destURL = (body.destURL.startsWith('https://') || body.destURL.startsWith('http://'))
    ? body.destURL
    : `http://${body.destURL}`

  const link = new Link({
    destURL,
    user: user.id,
  })


  let savedLink = await link.save()
  user.links = user.links.concat(savedLink.id)
  await user.save()
  savedLink = savedLink.toJSON()
  savedLink = {
    destURL: savedLink.destURL,
    id: savedLink.id,
    visits: savedLink.visits.length
  }
  return { code: 201, data: savedLink }

}

const deleteLink = async (request) => {
  const linkToRemove = await Link.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(linkToRemove.user.toString() === decodedToken.userId){
    await Link.findByIdAndRemove(request.params.id)
    return { code: 204, data: { message: 'Successfully removed a URL', URL: linkToRemove.destURL } }
  }else{
    return TOKEN_ERROR
  }
}

module.exports = {
  getLinkStatsByID,
  getLinksByUserToken,
  getLinkByID,
  createLink,
  deleteLink
}
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Link = require('../models/link')
const Visit = require('../models/visit')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const dateRandInMillis = require('../utils/dateRand')

let currentToken

const DATE_APPROX = 1000000

//variables for testing populate endpoint
const MAX_OFFSET = 400
let startDate
let endDate
let linkData

beforeEach(async () => {
  await Link.deleteMany({})
  await User.deleteMany({})
  const pwordHash = await bcrypt.hash(helper.initialUser.password, 1)
  const newUser = new User({
    username: helper.initialUser.username,
    passwordHash: pwordHash,
  })
  const savedUser = await newUser.save()
  for(let link of helper.initialLinks){
    let linkObject = new Link({ destURL: link, user: savedUser.id })
    await linkObject.save()
  }
})

describe('Retrieving a link', () => {
  test('that has the correct ID', async () => {
    const linkRetrieved = await Link.findOne({ destURL: helper.initialLinks[0] })
    await api
      .get(`/links/${linkRetrieved.id}`)
      .expect(302)
      .expect('location', helper.initialLinks[0])
  })
  test('that has an incorrect ID gives an error', async () => {
    await api
      .get('/links/nonexistentID')
      .expect(400)
      .expect('error', 'malformatted id')
  })
  test('Visits to a URL are recorded and with a correct timestamp', async () => {
    const linkRetrievedBefore = await Link.findOne({ destURL: helper.initialLinks[0] })
    const timeCurrently = Date.now() / DATE_APPROX
    await api
      .get(`/links/${linkRetrievedBefore.id}`)

    const linkRetrievedAfter = await Link.findOne({ destURL: helper.initialLinks[0] })
    const newestVisit = await Visit.findOne({ _id: linkRetrievedAfter.visits },
      {},
      { sort: { date: -1 } } )

    const visitDate = Date.parse(newestVisit.date) / DATE_APPROX
    expect(visitDate).toBeCloseTo(timeCurrently)
    expect(linkRetrievedAfter.visits).toHaveLength(linkRetrievedBefore.visits.length + 1)
  })
})

describe('User actions', () => {
  beforeEach(async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: helper.initialUser.username,
        password: helper.initialUser.password
      })
    currentToken = response.body.token
  })
  test('Database can be populated with dummy data', async () => {
    await api
      .get('/links/populate')
      .set('Authorization', `bearer ${currentToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  describe('User can retrieve visit data', () => {
    beforeEach( async () => {
      startDate = dateRandInMillis(MAX_OFFSET)
      endDate = dateRandInMillis(MAX_OFFSET)
      if(startDate > endDate){
        let temp = startDate
        startDate = endDate
        endDate = temp
      }
      startDate = new Date(startDate)
      endDate = new Date(endDate)
      linkData = await api
        .get('/links/populate')
        .set('Authorization', `bearer ${currentToken}`)
      linkData = linkData.body
    })
    test('Visits per day', async () => {
      const linkID = linkData[0].id
      let visitData = await api
        .get(`/links/stats/${linkID}/${startDate.toISOString()}/${endDate.toISOString()}/day`)
        .set('Authorization', `bearer ${currentToken}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      visitData = visitData.body
      if(visitData.length > 0){
        visitData = visitData.map(v => Date.parse(v._id))
        expect(Date.parse(startDate)).toBeLessThanOrEqual(Math.min(...visitData))
        expect(Date.parse(endDate)).toBeGreaterThanOrEqual(Math.max(...visitData))
      }
    })
  })
  test('A new URL can be added by the user', async () => {
    const newURL = { destURL: 'https://somesite.com' }
    await api
      .post('/links')
      .send(newURL)
      .set('Authorization', `bearer ${currentToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const linksAtTheEnd = await helper.linksInDB()
    expect(linksAtTheEnd).toHaveLength(helper.initialLinks.length + 1)

    const URLS = linksAtTheEnd.map(link => link.destURL)
    expect(URLS).toContain(newURL.destURL)
  })
  test('Adding just a base URL results in a valid URI', async () => {
    const newURL = { destURL: 'somesite.com' }
    const response = await api
      .post('/links')
      .send(newURL)
      .set('Authorization', `bearer ${currentToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const linkID = response.body.id

    await api
      .get(`/links/${linkID}`)
      .expect(302)
      .expect('location', `http://${newURL.destURL}`)
  })
  test('A User can see visits to his links', async () => {
    const initialData = await api
      .get('/links')
      .set('Authorization', `bearer ${currentToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const linkToVisit = await Link.findOne({ destURL: helper.initialLinks[0] })

    const initialLinkVisits = initialData.body
      .find(l => l.destURL === linkToVisit.destURL)
      .visits
    await api
      .get(`/links/${linkToVisit.id}`)

    const updatedData = await api
      .get('/links')
      .set('Authorization', `bearer ${currentToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedLinkVisits = updatedData.body
      .find(l => l.destURL === linkToVisit.destURL)
      .visits

    expect(updatedLinkVisits).toEqual(initialLinkVisits + 1)
  })
  test('A link can be deleted', async () => {
    const linksBefore = await helper.linksInDB()
    const linkID = linksBefore[0].id
    await api
      .delete(`/links/${linkID}`)
      .set('Authorization', `bearer ${currentToken}`)
      .expect(204)

    const linksAfter = await helper.linksInDB()
    expect(linksBefore).toHaveLength(linksAfter.length + 1)
    expect(linksAfter).not.toContain(linksBefore.find(l => l.id = linkID))
  })
  test('A link without authorization can not be deleted', async () => {
    const linksBefore = await helper.linksInDB()
    const linkID = linksBefore[0].id
    await api
      .delete(`/links/${linkID}`)
      .expect(401)
      .expect('error', 'jwt must be provided')

    await api
      .delete(`/links/${linkID}`)
      .set('Authorization', 'bearer malformattedToken')
      .expect(401)
      .expect('error', 'jwt malformed')

    const invalidToken = 'invalid' + currentToken.substr(7)
    await api
      .delete(`/links/${linkID}`)
      .set('Authorization', `bearer ${invalidToken}`)
      .expect(401)
      .expect('error', 'invalid token')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
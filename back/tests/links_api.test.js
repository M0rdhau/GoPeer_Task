const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Link = require('../models/link')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

let currentToken

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
})

afterAll(() => {
  mongoose.connection.close()
})
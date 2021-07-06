const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')
const userService = require('../services/usersService')

beforeEach(async () => {
  await User.deleteMany({})
  const initialUsers = helper.initialUsers.map(u => ({ body : u }))
  for(let user of initialUsers){
    await userService.addUser(user)
  }
})

describe('getting users from the database', () => {
  test('GET to users endpoint returns full list of users', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const users = helper.initialUsers
    expect(response.body).toHaveLength(users.length)

    const userNamesInDB = response.body.map(u => u.username)
    const initialUserNames = users.map(u => u.username)
    expect(userNamesInDB).toEqual(initialUserNames)
  })
})

describe('adding a user to the database', () => {
  test('POSTing a user adds it to the database', async () => {
    const newUser = {
      username: 'Zurikela',
      password: 'GameArisMtvariani'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersFinally = await helper.usersInDB()
    expect(usersFinally).toHaveLength(helper.initialUsers.length + 1)

    const userNamesInDB = usersFinally.map(u => u.username)
    expect(userNamesInDB).toContain(newUser.username)
  })
  test('Registering a same user twice throws an error', async () => {
    const newUser = {
      username: 'Zurikela',
      password: 'GameArisMtvariani'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const anotherNewUser = {
      username: 'Zurikela',
      password: 'PaetonsArGadakve'
    }
    await api
      .post('/api/users')
      .send(anotherNewUser)
      .expect(406)
      .expect('error', 'Username must be unique')
  })
  test('Registering a user with a username too short throws an error', async () => {
    const newUser = {
      username: 'Zu',
      password: 'GameArisMtvariani'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(406)
      .expect('error', 'Username too short')
  })
})

describe('Logging in', () => {
  test('with an existing user is successful', async () => {
    const randomUser = helper.initialUsers[
      Math.floor(Math.random() * helper.initialUsers.length)
    ]
    const response = await api
      .post('/api/login')
      .send(randomUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.username).toEqual(randomUser.username)
  })
  test('with an existing username but wrong password is unsuccessful', async () => {
    const randomUser = helper.initialUsers[
      Math.floor(Math.random() * helper.initialUsers.length)
    ]
    await api
      .post('/api/login')
      .send({ username: randomUser.username, password: 'bla' })
      .expect(400)
      .expect('error', 'invalid username or password')
  })
})

afterAll(() => {
  mongoose.connection.close()
})